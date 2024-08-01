goog.loadJs('web', () => {

goog.require('DAPjs');
goog.require('Mixly.Serial');
goog.require('Mixly.Env');
goog.require('Mixly.Nav');
goog.require('Mixly.Msg');
goog.require('Mixly.Debug');
goog.require('Mixly.Registry');
goog.require('Mixly.Web');
goog.provide('Mixly.Web.USB');

const {
    Serial,
    Env,
    Nav,
    Msg,
    Debug,
    Registry,
    Web
} = Mixly;

class USB extends Serial {
    static {
        this.portToNameRegistry = new Registry();
        this.serialNumberToNameRegistry = new Registry();
        this.nameToPortRegistry = new Registry();

        this.getConfig = function () {
            return Serial.getConfig();
        }

        this.getSelectedPortName = function () {
            return Serial.getSelectedPortName();
        }

        this.getCurrentPortsName = function () {
            return Serial.getCurrentPortsName();
        }

        this.refreshPorts = function () {
            let portsName = [];
            for (let name of this.nameToPortRegistry.keys()) {
                portsName.push({ name });
            }
            Serial.renderSelectBox(portsName);
        }

        this.requestPort = function () {
            navigator.usb.requestDevice({ filters: [{ vendorId: 0xD28 }] })
                .then((device) => {
                    this.addPort(device);
                    this.refreshPorts();
                })
                .catch(Debug.error);
        }

        this.getPort = function (name) {
            return this.nameToPortRegistry.getItem(name);
        }

        this.addPort = function (device) {
            if (this.portToNameRegistry.hasKey(device)) {
                return;
            }
            const { serialNumber } = device;
            let name = this.serialNumberToNameRegistry.getItem(serialNumber);
            if (!name) {
                for (let i = 1; i <= 20; i++) {
                    name = `usb${i}`;
                    if (this.nameToPortRegistry.hasKey(name)) {
                        continue;
                    }
                    break;
                }
                this.serialNumberToNameRegistry.register(serialNumber, name);
            }
            this.portToNameRegistry.register(device, name);
            this.nameToPortRegistry.register(name, device);
        }

        this.removePort = function (device) {
            if (!this.portToNameRegistry.hasKey(device)) {
                return;
            }
            const name = this.portToNameRegistry.getItem(device);
            if (!name) {
                return;
            }
            this.portToNameRegistry.unregister(device);
            this.nameToPortRegistry.unregister(name);
        }

        this.addEventsListener = function () {
            navigator.usb.addEventListener('connect', (event) => {
                this.addPort(event.device);
                this.refreshPorts();
            });

            navigator.usb.addEventListener('disconnect', (event) => {
                this.removePort(event.device);
                this.refreshPorts();
            });
        }
        navigator.usb.getDevices().then((devices) => {
            for (let device of devices) {
                this.addPort(device);
            }
        });
        this.addEventsListener();
    }

    #device_ = null;
    #webUSB_ = null;
    #dapLink_ = null;
    #keepReading_ = null;
    #reader_ = null;
    #writer_ = null;
    #stringTemp_ = '';
    constructor(port) {
        super(port);
    }

    #addEventsListener_() {
        this.#addReadEventListener_();
    }

    #addReadEventListener_() {
        this.#dapLink_.on(DAPjs.DAPLink.EVENT_SERIAL_DATA, data => {
            const str = data.split('');
            for (let i = 0; i < str.length; i++) {
                this.onChar(str[i]);
            }
        });
        this.#dapLink_.startSerialRead(this.#device_);
    }

    async open(baud) {
        const portsName = Serial.getCurrentPortsName();
        const currentPortName = this.getPortName();
        if (!portsName.includes(currentPortName)) {
            throw new Error('无可用串口');
        }
        if (this.isOpened()) {
            return;
        }
        baud = baud ?? this.getBaudRate();
        this.#device_ = USB.getPort(currentPortName);
        this.#webUSB_ = new DAPjs.WebUSB(this.#device_);
        this.#dapLink_ = new DAPjs.DAPLink(this.#webUSB_);
        await this.#dapLink_.connect();
        super.open(baud);
        await this.setBaudRate(baud);
        this.onOpen();
        this.#addEventsListener_();
    }

    async close() {
        if (!this.isOpened()) {
            return;
        }
        super.close();
        this.#dapLink_.removeAllListeners(DAPjs.DAPLink.EVENT_SERIAL_DATA);
        this.#dapLink_.stopSerialRead();
        await this.#dapLink_.stopSerialRead();
        await this.#dapLink_.disconnect();
        this.#dapLink_ = null;
        await this.#webUSB_.close();
        this.#webUSB_ = null;
        await this.#device_.close();
        this.#device_ = null;
        this.onClose(1);
    }

    async setBaudRate(baud) {
        if (!this.isOpened() || this.getBaudRate() === baud) {
            return;
        }
        await this.setSerialBaudrate(baud);
        await super.setBaudRate(baud);
    }

    async sendString(str) {
        return this.#dapLink_.serialWrite(str);
    }

    async sendBuffer(buffer) {
        if (typeof buffer.unshift === 'function') {
            buffer.unshift(buffer.length);
            buffer = new Uint8Array(buffer).buffer;
        }
        return this.#dapLink_.send(132, buffer);
    }

    async setDTRAndRTS(dtr, rts) {
        if (!this.isOpened()
            || (this.getDTR() === dtr && this.getRTS() === rts)) {
            return;
        }
        await super.setDTRAndRTS(dtr, rts);
    }

    async setDTR(dtr) {
        return this.setDTRAndRTS(dtr, this.getRTS());
    }

    async setRTS(rts) {
        return this.setDTRAndRTS(this.getDTR(), rts);
    }

    onChar(char) {
        super.onChar(char);
        if (['\r', '\n'].includes(char)) {
            super.onString(this.#stringTemp_);
            this.#stringTemp_ = '';
        } else {
            this.#stringTemp_ += char;
        }
        const buffer = this.encode(char);
        super.onBuffer(buffer);
        for (let i = 0; i < buffer.length; i++) {
            super.onByte(buffer[i]);
        }
    }
}

Web.USB = USB;

});