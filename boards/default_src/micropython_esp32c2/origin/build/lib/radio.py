"""
Radio-ESP-NOW(ESP32-C2)

Micropython library for the Radio-ESP-NOW(ESP32-C2)
=======================================================
@dahanzimin From the Mixly Team 
"""

import espnow
from ubinascii import hexlify,unhexlify
import network

class ESPNow(espnow.ESPNow):
    def __init__(self,channel=1,txpower=20):
        super().__init__()
        self.active(True)
        self._channel = channel
        self._txpower = txpower
        self._nic = network.WLAN(network.STA_IF)
        self._nic.active(True)
        self._nic.config(channel=self._channel,txpower=self._txpower)

    def send(self,peer,msg):
        '''Send data after error reporting and effective processing'''    
        try:
            _peer=unhexlify(peer)
            return super().send(_peer, str(msg))
        except OSError as err:
            if len(err.args) < 2:
                raise err
            if err.args[1] == 'ESP_ERR_ESPNOW_NOT_INIT':
                raise OSError("Radio(ESPNOW) is not activated, unable to transmit data") 
            elif err.args[1] == 'ESP_ERR_ESPNOW_IF':
                self._nic.active(True)
            elif err.args[1] == 'ESP_ERR_ESPNOW_NOT_FOUND':
                self.add_peer(_peer)
                return super().send(_peer, str(msg))
            elif err.args[1] == 'ESP_ERR_ESPNOW_NO_MEM':
                raise OSError("internal ESP-NOW buffers are full")  
            elif err.args[1] == 'ESP_ERR_ESPNOW_ARG':
                raise OSError("invalid argument")                 
            else:
                raise err  

    def recv(self):
        '''Receive data'''
        if self.any():
            host, msg = super().recv()  
            return hexlify(host).decode(),msg.decode()
        else :
            return None,None

    def set_channel(self,channel=None,txpower=None):
        self._channel = self._channel if channel is None else channel
        self._nic.config(channel=self._channel, txpower=self._txpower if txpower is None else txpower)        

    def _cb_handle(self, ee):
        '''Callback processing conversion'''
        host, msg = super().recv() 
        if self._on_handle:
            if isinstance(self._on_handle, list):
                for func in self._on_handle:
                    cmd = func.__name__.rfind('__')
                    if cmd != -1:
                        cmd=func.__name__[cmd+2:]
                        if cmd == str(msg.decode()):
                            func(hexlify(host).decode(), msg.decode())
                    else:
                        func(hexlify(host).decode(), msg.decode())
            else:
                self._on_handle(hexlify(host).decode(), msg.decode())

    def recv_cb(self, recv_cbs):
        '''Receive callback'''
        self._on_handle = recv_cbs
        if recv_cbs:
                self.irq(self._cb_handle)

    def info(self):
        '''Get the paired Mac and rssi'''
        _info=[]
        for i in self.peers_table:
            _info.append((hexlify(i).decode(),self.peers_table[i][0]))
        return _info

    @property
    def mac(self):
        '''Get mac address'''
        return hexlify(self._nic.config('mac')).decode()

    @property
    def channel(self):
        '''Get mac address'''
        return self._nic.config('channel')
