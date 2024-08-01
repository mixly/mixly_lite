goog.loadJs('web', () => {

goog.require('ESPTool');
goog.require('AdafruitESPTool');
goog.require('CryptoJS');
goog.require('AvrUploader');
goog.require('Mixly.Env');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Config');
goog.require('Mixly.MFile');
goog.require('Mixly.Boards');
goog.require('Mixly.Msg');
goog.require('Mixly.Workspace');
goog.require('Mixly.Debug');
goog.require('Mixly.Web.Serial');
goog.require('Mixly.Web.USB');
goog.require('Mixly.Web.Ampy');
goog.provide('Mixly.Web.BU');

const {
    Env,
    Web,
    LayerExt,
    Config,
    MFile,
    Boards,
    Msg,
    Workspace,
    Debug
} = Mixly;

const {
    Serial,
    Esptool,
    BU,
    USB,
    Ampy
} = Web;

const { BOARD, SELECTED_BOARD } = Config;

const {
    ESPLoader,
    Transport
} = ESPTool;

BU.uploading = false;
BU.burning = false;

BU.requestPort = () => {
    if (SELECTED_BOARD.web.com === 'usb') {
        USB.requestPort();
    } else {
        Serial.requestPort();
    }
}

const readBinFile = (path, offset) => {
    return new Promise((resolve, reject) => {
        fetch(path)
        .then((response) => {
            return response.blob();
        })
        .then((blob) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                resolve({
                    address: parseInt(offset),
                    data: event.target.result
                });
            };
            reader.onerror = function (error) {
                throw(error);
            }
            reader.readAsBinaryString(blob);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

const readBinFileAsArrayBuffer = (path, offset) => {
    return new Promise((resolve, reject) => {
        fetch(path)
        .then((response) => {
            return response.blob();
        })
        .then((blob) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                resolve({
                    address: parseInt(offset),
                    data: event.target.result
                });
            };
            reader.onerror = function (error) {
                throw(error);
            }
            reader.readAsArrayBuffer(blob);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

BU.initBurn = () => {
    if (SELECTED_BOARD.web.com === 'usb') {
        BU.burnByUSB();
    } else {
        const boardKey = Boards.getSelectedBoardKey();
        if (boardKey.indexOf('micropython:esp32s2') !== -1) {
            BU.burnWithAdafruitEsptool();
        } else {
            BU.burnWithEsptool();
        }
    }
}

BU.burnByUSB = () => {
    const portName = 'web-usb';
    Serial.connect(portName, 115200, async (port) => {
        if (!port) {
            return;
        }
        let portObj = Serial.portsOperator[portName];
        const { toolConfig, serialport } = portObj;
        const prevBaud = toolConfig.baudRates;
        if (prevBaud !== 115200) {
            toolConfig.baudRates = 115200;
            await serialport.setBaudRate(toolConfig.baudRates);
        }
        const { web } = SELECTED_BOARD;
        const { burn } = web;
        const hexStr = goog.get(path.join(Env.boardDirPath, burn.filePath));
        const hex2Blob = new Blob([ hexStr ], { type: 'text/plain' });
        const buffer = await hex2Blob.arrayBuffer();
        if (!buffer) {
            layer.msg(Msg.Lang['固件读取出错'], { time: 1000 });
            return;
        }
        BU.burning = true;
        BU.uploading = false;
        const { mainStatusBarTabs } = Mixly;
        const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
        statusBarTerminal.setValue(Msg.Lang['shell.burning'] + '...\n');
        mainStatusBarTabs.show();
        mainStatusBarTabs.changeTo('output');
        const layerNum = layer.open({
            type: 1,
            title: Msg.Lang['shell.burning'] + '...',
            content: $('#mixly-loader-div'),
            shade: LayerExt.SHADE_NAV,
            resize: false,
            closeBtn: 0,
            success: function (layero, index) {
                $(".layui-layer-page").css("z-index","198910151");
                $("#mixly-loader-btn").hide();
                let prevPercent = 0;
                USB.DAPLink.on(DAPjs.DAPLink.EVENT_PROGRESS, progress => {
                    const nowPercent = Math.floor(progress * 100);
                    if (nowPercent > prevPercent) {
                        prevPercent = nowPercent;
                    } else {
                        return;
                    }
                    const nowProgressLen = Math.floor(nowPercent / 2);
                    const leftStr = new Array(nowProgressLen).fill('=').join('');
                    const rightStr = (new Array(50 - nowProgressLen).fill('-')).join('');
                    statusBarTerminal.addValue(`[${leftStr}${rightStr}] ${nowPercent}%\n`);
                });
                USB.flash(buffer)
                .then(() => {
                    layer.close(index);
                    layer.msg(Msg.Lang['shell.burnSucc'], { time: 1000 });
                    statusBarTerminal.addValue(`==${Msg.Lang['shell.burnSucc']}==\n`);
                })
                .catch((error) => {
                    console.log(error);
                    layer.close(index);
                    statusBarTerminal.addValue(`==${Msg.Lang['shell.burnFailed']}==\n`);
                })
                .finally(async () => {
                    BU.burning = false;
                    BU.uploading = false;
                    if (toolConfig.baudRates !== prevBaud) {
                        toolConfig.baudRates = prevBaud;
                        await serialport.setBaudRate(prevBaud);
                    }
                    USB.DAPLink.removeAllListeners(DAPjs.DAPLink.EVENT_PROGRESS);
                });
            },
            end: function () {
                $("#mixly-loader-btn").css('display', 'inline-block');
                $('#mixly-loader-div').css('display', 'none');
                $("#layui-layer-shade" + layerNum).remove();
            }
        });
    });
}

BU.burnWithEsptool = async () => {
    const { web } = SELECTED_BOARD;
    const { burn } = web;
    const { mainStatusBarTabs } = Mixly;
    const portName = Serial.getSelectedPortName();
    if (!portName) {
        layer.msg(Msg.Lang['statusbar.serial.noDevice'], {
            time: 1000
        });
        return;
    }
    const statusBarSerial = mainStatusBarTabs.getStatusBarById(portName);
    if (statusBarSerial) {
        await statusBarSerial.close();
    }
    const port = Serial.getPort(portName);
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    statusBarTerminal.setValue(Msg.Lang['shell.burning'] + '...\n');
    mainStatusBarTabs.show();
    mainStatusBarTabs.changeTo('output');
    let esploader = null;
    let transport = null;
    try {
        transport = new Transport(port, false);
        esploader = new ESPLoader({
            transport,
            baudrate: 921600,
            terminal: {
                clean() {
                    statusBarTerminal.setValue('');
                },
                writeLine(data) {
                    statusBarTerminal.addValue(data + '\n');
                },
                write(data) {
                    statusBarTerminal.addValue(data);
                }
            }
        });
        let chip = await esploader.main();
    } catch (error) {
        console.log(error);
        statusBarTerminal.addValue(`\n${error.toString()}\n`);
        await transport.disconnect();
        return;
    }

    statusBarTerminal.addValue(Msg.Lang['shell.bin.reading'] + "...");
    if (typeof burn.binFile !== 'object') {
        statusBarTerminal.addValue(" Failed!\n" + Msg.Lang['shell.bin.readFailed'] + "！\n");
        await transport.disconnect();
        return;
    }
    const { binFile } = burn;
    let firmwarePromise = [];
    statusBarTerminal.addValue("\n");
    for (let i of binFile) {
        if (i.path && i.offset) {
            let absolutePath = path.join(Env.boardDirPath, i.path);
            // statusBarTerminal.addValue(`${Msg.Lang['读取固件'] + ' '
            //     + Msg.Lang['路径']}:${absolutePath}, ${Msg.Lang['偏移']}:${i.offset}\n`);
            firmwarePromise.push(readBinFile(absolutePath, i.offset));
        }
    }
    let data = null;
    try {
        data = await Promise.all(firmwarePromise);
    } catch (error) {
        statusBarTerminal.addValue("Failed!\n" + Msg.Lang['shell.bin.readFailed'] + "！\n");
        statusBarTerminal.addValue("\n" + e + "\n", true);
        await transport.disconnect();
        return;
    }
    statusBarTerminal.addValue("Done!\n");
    BU.burning = true;
    BU.uploading = false;
    const flashOptions = {
        fileArray: data,
        flashSize: 'keep',
        eraseAll: false,
        compress: true,
        calculateMD5Hash: (image) => CryptoJS.MD5(CryptoJS.enc.Latin1.parse(image))
    };
    const layerNum = layer.open({
        type: 1,
        title: Msg.Lang['shell.burning'] + '...',
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_NAV,
        resize: false,
        closeBtn: 0,
        success: async function (layero, index) {
            let cancel = false;
            $("#mixly-loader-btn").off().click(async () => {
                cancel = true;
                try {
                    await transport.disconnect();
                } catch (error) {
                    layer.close(index);
                    console.log(error);
                }
            });
            try {
                await esploader.writeFlash(flashOptions);
                layer.msg(Msg.Lang['shell.burnSucc'], { time: 1000 });
                statusBarTerminal.addValue(`==${Msg.Lang['shell.burnSucc']}==\n`);
            } catch (error) {
                console.log(error);
                statusBarTerminal.addValue(`==${Msg.Lang['shell.burnFailed']}==\n`);
            } finally {
                layer.close(index);
                if (!cancel) {
                    await transport.disconnect();
                }
            }
        }
    });
}

BU.burnWithAdafruitEsptool = async () => {
    const { web } = SELECTED_BOARD;
    const { burn } = web;
    const { mainStatusBarTabs } = Mixly;
    const portName = Serial.getSelectedPortName();
    if (!portName) {
        layer.msg(Msg.Lang['statusbar.serial.noDevice'], {
            time: 1000
        });
        return;
    }
    const statusBarSerial = mainStatusBarTabs.getStatusBarById(portName);
    if (statusBarSerial) {
        await statusBarSerial.close();
    }
    const port = Serial.getPort(portName);
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    statusBarTerminal.setValue(Msg.Lang['shell.burning'] + '...\n');
    mainStatusBarTabs.show();
    mainStatusBarTabs.changeTo('output');
    let esploader = null;
    let transport = null;
    let espStub = null;
    try {
        await port.open({ baudRate: 115200 });
        esploader = new AdafruitESPTool.ESPLoader(port, {
            log(...args) {
                statusBarTerminal.addValue(args.join('') + '\n');
            },
            debug(...args) {
                statusBarTerminal.addValue(args.join('') + '\n');
            },
            error(...args) {
                statusBarTerminal.addValue(args.join('') + '\n');
            }
        });
        await esploader.initialize();
        espStub = await esploader.runStub();
    } catch (error) {
        console.log(error);
        statusBarTerminal.addValue(`\n${error.toString()}\n`);
        await port.close();
        return;
    }

    statusBarTerminal.addValue(Msg.Lang['shell.bin.reading'] + "...");
    if (typeof burn.binFile !== 'object') {
        statusBarTerminal.addValue(" Failed!\n" + Msg.Lang['shell.bin.readFailed'] + "！\n");
        await espStub.disconnect();
        await espStub.port.close();
        return;
    }
    const { binFile } = burn;
    let firmwarePromise = [];
    statusBarTerminal.addValue("\n");
    for (let i of binFile) {
        if (i.path && i.offset) {
            let absolutePath = path.join(Env.boardDirPath, i.path);
            // statusBarTerminal.addValue(`${Msg.Lang['读取固件'] + ' '
            //     + Msg.Lang['路径']}:${absolutePath}, ${Msg.Lang['偏移']}:${i.offset}\n`);
            firmwarePromise.push(readBinFileAsArrayBuffer(absolutePath, i.offset));
        }
    }
    let data = null;
    try {
        data = await Promise.all(firmwarePromise);
    } catch (error) {
        statusBarTerminal.addValue("Failed!\n" + Msg.Lang['shell.bin.readFailed'] + "！\n");
        statusBarTerminal.addValue("\n" + e + "\n", true);
        await espStub.disconnect();
        await espStub.port.close();
        return;
    }
    statusBarTerminal.addValue("Done!\n");
    BU.burning = true;
    BU.uploading = false;
    const layerNum = layer.open({
        type: 1,
        title: Msg.Lang['shell.burning'] + '...',
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_NAV,
        resize: false,
        closeBtn: 0,
        success: async function (layero, index) {
            let cancel = false;
            $("#mixly-loader-btn").hide();
            try {
                for (let file of data) {
                    await espStub.flashData(
                        file.data,
                        (bytesWritten, totalBytes) => {
                            const percent = Math.floor((bytesWritten / totalBytes) * 100) + '%';
                            statusBarTerminal.addValue(`Writing at 0x${(file.address + bytesWritten).toString(16)}... (${percent})\n`);
                        },
                        file.address, true
                    );
                }
                await espStub.disconnect();
                await espStub.port.close();
                cancel = true;
                layer.msg(Msg.Lang['shell.burnSucc'], { time: 1000 });
                statusBarTerminal.addValue(`==${Msg.Lang['shell.burnSucc']}==\n`);
            } catch (error) {
                console.log(error);
                statusBarTerminal.addValue(`==${Msg.Lang['shell.burnFailed']}==\n`);
            } finally {
                layer.close(index);
                if (!cancel) {
                    await espStub.disconnect();
                    await espStub.port.close();
                }
            }
        }
    });
}

BU.getImportModulesName = (code) => {
    const { web = {} } = SELECTED_BOARD;
    const { lib } = web;
    if (!(lib instanceof Object)) {
        return [];
    }
    let lineList = [];
    code.trim().split("\n").forEach(function (v, i) {
        lineList.push(v);
    });
    let moduleName = "";
    let moduleList = [];
    for (let data of lineList) {
        let fromLoc = data.indexOf("from");
        let importLoc = data.indexOf("import");
        const str = data.substring(0, (fromLoc === -1)? importLoc : fromLoc);
        str.split('').forEach((ch) => {
            if (ch !== ' ' && ch !== '\t') {
                fromLoc = -1;
                importLoc = -1;
                return;
            }
        });
        if (fromLoc !== -1) {
            moduleName = data.substring(fromLoc + 4, data.indexOf("import"));
        } else if (importLoc !== -1) {
            moduleName = data.substring(importLoc + 6);
        } else {
            continue;
        }
        moduleName = moduleName.replaceAll(' ', '');
        moduleName = moduleName.replaceAll('\r', '');
        moduleList = [ ...moduleList, ...moduleName.split(",") ];
    }
    return moduleList;
}

BU.searchLibs = (moduleList, libList = []) => {
    const { web = {} } = SELECTED_BOARD;
    const { lib } = web;
    if (!(lib instanceof Object)) {
        return [];
    }
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    for (let name of moduleList) {
        if (!libList.includes(name)) {
            if (!lib[name]) {
                continue;
            }
            libList.push(name);
            statusBarTerminal.addValue(Msg.Lang['shell.copyLib'] + ' ' + name + '.py\n');
            if (!lib[name].import.length) {
                continue;
            }
            libList = BU.searchLibs(lib[name].import, libList);
        }
    }
    return libList;
}

BU.initUpload = () => {
    const portName = Serial.getSelectedPortName();
    if (!portName) {
        layer.msg(Msg.Lang['statusbar.serial.noDevice'], {
            time: 1000
        });
        return;
    }
    BU.uploadWithAmpy(portName);
}

BU.uploadWithAmpy = (portName) => {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    let statusBarSerial = mainStatusBarTabs.getStatusBarById(portName);
    BU.burning = false;
    BU.uploading = true;
    statusBarTerminal.setValue(Msg.Lang['shell.uploading'] + '...\n');
    mainStatusBarTabs.show();
    mainStatusBarTabs.changeTo('output');
    const mainWorkspace = Workspace.getMain();
    const editor = mainWorkspace.getEditorsManager().getActive();
    const layerNum = layer.open({
        type: 1,
        title: Msg.Lang['shell.uploading'] + '...',
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_NAV,
        resize: false,
        closeBtn: 0,
        success: function (layero, index) {
            const serial = new Serial(portName);
            const ampy = new Ampy(serial);
            const code = editor.getCode();
            /*let moduleList = BU.getImportModulesName(code);
            moduleList = BU.searchLibs(moduleList);
            const moduleInfo = {};
            for (let name of moduleList) {
                moduleInfo[name] = SELECTED_BOARD.web.lib[name].path;
            }*/
            let closePromise = Promise.resolve();
            if (statusBarSerial) {
                closePromise = statusBarSerial.close();
            }
            closePromise
            .then(() => ampy.enter())
            .then(() => {
                statusBarTerminal.addValue('Writing main.py ');
                return ampy.put('main.py', code);
            })
            .then(() => {
                statusBarTerminal.addValue('Done!\n');
                return ampy.exit();
            })
            .then(() => ampy.dispose())
            .then(() => {
                layer.close(index);
                layer.msg(Msg.Lang['shell.uploadSucc'], { time: 1000 });
                statusBarTerminal.addValue(`==${Msg.Lang['shell.uploadSucc']}==\n`);
                if (!statusBarSerial) {
                    mainStatusBarTabs.add('serial', portName);
                    statusBarSerial = mainStatusBarTabs.getStatusBarById(portName);
                }
                statusBarSerial.setValue('');
                mainStatusBarTabs.changeTo(portName);
                statusBarSerial.open().catch(Debug.error);
            })
            .catch((error) => {
                ampy.dispose();
                layer.close(index);
                console.error(error);
                statusBarTerminal.addValue(`${error}\n`);
                statusBarTerminal.addValue(`==${Msg.Lang['shell.uploadFailed']}==\n`);
            })
            .finally(async () => {
                BU.burning = false;
                BU.uploading = false;
            });
        }
    });
}

function hexToBuf (hex) {
    var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
        return parseInt(h, 16)
    }));
    
    return typedArray.buffer;
}

BU.uploadWithEsptool = async (endType, obj, layerType) => {
    const portName = 'web-serial';
    const portObj = Serial.portsOperator[portName];
    const { serialport, toolConfig } = portObj;
    let prevBaud = toolConfig.baudRates;
    if (prevBaud !== 115200) {
        toolConfig.baudRates = 115200;
        await serialport.setBaudRate(toolConfig.baudRates);
    }
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    let firmwareData = obj.data;
    if (endType || typeof firmwareData !== 'object') {
        statusBarTerminal.addValue(Msg.Lang['shell.bin.readFailed'] + "！\n");
        layer.close(layerType);
        return;
    }
    layer.title(Msg.Lang['shell.uploading'] + '...', layerType);
    statusBarTerminal.addValue(Msg.Lang['shell.bin.reading'] + "... ");
    let firmwareList = [];
    for (let i of firmwareData) {
        if (!i.offset || !i.data) {
            continue;
        }
        const firmware = {
            offset: i.offset,
            binBuf: hexToBuf(i.data)
        };
        firmwareList.push(firmware);
    }
    statusBarTerminal.addValue("Done!\n");
    BU.burning = true;
    BU.uploading = false;
    statusBarTerminal.addValue(Msg.Lang['shell.uploading'] + '...\n');
    mainStatusBarTabs.show();
    mainStatusBarTabs.changeTo('output');
    try {
        SerialPort.refreshOutputBuffer = false;
        SerialPort.refreshInputBuffer = true;
        await espTool.reset();
        if (await clickSync()) {
            // await clickErase();
            for (let i of firmwareList) {
                await clickProgram(i.offset, i.binBuf);
            }
        }
        layer.close(layerType);
        layer.msg(Msg.Lang['shell.uploadSucc'], { time: 1000 });
        statusBarTerminal.addValue(`==${Msg.Lang['shell.uploadSucc']}==\n`);
        Serial.reset(portName, 'upload');
        mainStatusBarTabs.changeTo(portName);
    } catch (error) {
        console.log(error);
        layer.close(layerType);
        statusBarTerminal.addValue(`==${Msg.Lang['shell.uploadFailed']}==\n`);
    } finally {
        SerialPort.refreshOutputBuffer = true;
        SerialPort.refreshInputBuffer = false;
        const code = MFile.getCode();
        const baudRateList = code.match(/(?<=Serial.begin[\s]*\([\s]*)[0-9]*(?=[\s]*\))/g);
        if (baudRateList && Serial.BAUDRATES.includes(baudRateList[0]-0)) {
            prevBaud = baudRateList[0]-0;
        }
        if (toolConfig.baudRates !== prevBaud) {
            toolConfig.baudRates = prevBaud;
            await serialport.setBaudRate(prevBaud);
        }
    }
}

BU.uploadWithAvrUploader = async (endType, obj, layerType) => {
    let firmwareData = obj.data;
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    if (endType || typeof firmwareData !== 'object') {
        statusBarTerminal.addValue(Msg.Lang['shell.bin.readFailed'] + "！\n");
        layer.close(layerType);
        return;
    }
    statusBarTerminal.addValue(Msg.Lang['shell.uploading'] + '...\n');
    layer.title(Msg.Lang['shell.uploading'] + '...', layerType);
    let uploadSucMessageShow = true;
    AvrUploader.upload(firmwareData[0].data, (progress) => {
        if (progress >= 100 && uploadSucMessageShow) {
            statusBarTerminal.addValue(`==${Msg.Lang['shell.uploadSucc']}==\n`);
            layer.msg(Msg.Lang['shell.uploadSucc'], { time: 1000 });
            layer.close(layerType);
            uploadSucMessageShow = false;
        }
    }, true)
    .catch((error) => {
        layer.close(layerType);
        statusBarTerminal.addValue(`==${Msg.Lang['shell.uploadFailed']}==\n`);
    });
}

});