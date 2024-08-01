goog.loadJs('web', () => {

goog.require('layui');
goog.require('Mixly.Env');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Config');
goog.require('Mixly.Title');
goog.require('Mixly.Boards');
goog.require('Mixly.MFile');
goog.require('Mixly.MArray');
goog.require('Mixly.Msg');
goog.require('Mixly.WebSocket.Socket');
goog.require('Mixly.WebSocket.Serial');
goog.provide('Mixly.WebSocket.ArduShell');

const {
    Env,
    LayerExt,
    Title,
    Boards,
    MFile,
    MArray,
    Msg,
    Config
} = Mixly;

const { BOARD, SOFTWARE, USER } = Config;

const { 
    Socket,
    ArduShell,
    Serial
} = Mixly.WebSocket;

/**
* @function 编译
* @description 开始一个编译过程
* @return void
*/
ArduShell.initCompile = () => {
    Socket.connect((WS) => {
        layer.closeAll();
    }, () => {
        ArduShell.compile();
    });
}

/**
* @function 编译
* @description 开始一个编译过程
* @return void
*/
ArduShell.compile = () => {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    mainStatusBarTabs.changeTo('output');
    ArduShell.compiling = true;
    ArduShell.uploading = false;
    const boardType = Boards.getSelectedBoardCommandParam();
    mainStatusBarTabs.show();
    const layerNum = layer.open({
        type: 1,
        title: Msg.Lang['shell.compiling'] + "...",
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_NAV,
        resize: false,
        closeBtn: 0,
        success: (layero, index) => {
            $(".layui-layer-page").css("z-index", "198910151");
            $("#mixly-loader-btn").off("click").click(() => {
                $("#mixly-loader-btn").css('display', 'none');
                layer.title(Msg.Lang['shell.aborting'] + '...', index);
                ArduShell.cancel();
            });
            statusBarTerminal.setValue(Msg.Lang['shell.compiling'] + "...\n");
            const code = MFile.getCode();
            Socket.sendCommand({
                obj: 'ArduShell',
                func: 'compile',
                args: [ index, boardType, code ]
            });
        },
        end: () => {
            $('#mixly-loader-div').css('display', 'none');
            $("layui-layer-shade" + layerNum).remove();
            $("#mixly-loader-btn").off("click");
            $("#mixly-loader-btn").css('display', 'inline-block');
        }
    });
}

/**
* @function 初始化上传
* @description 关闭已打开的串口，获取当前所连接的设备数，然后开始上传程序
* @return void
*/
ArduShell.initUpload = () => {
    Socket.connect((WS) => {
        layer.closeAll();
    }, () => {
        ArduShell.compiling = false;
        ArduShell.uploading = true;
        const boardType = Boards.getSelectedBoardCommandParam();
        const uploadType = Boards.getSelectedBoardConfigParam('upload_method');
        let port = Serial.getSelectedPortName();
        switch (uploadType) {
            case 'STLinkMethod':
            case 'jlinkMethod':
            case 'usb':
                port = 'None';
                break;
        }
        if (port) {
            ArduShell.upload(boardType, port);
        } else {
            layer.msg(Msg.Lang['statusbar.serial.noDevice'], {
                time: 1000
            });
        }
    });
}

/**
* @function 上传程序
* @description 通过所选择串口号开始一个上传过程
* @return void
*/
ArduShell.upload = (boardType, port) => {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    mainStatusBarTabs.changeTo("output");
    const layerNum = layer.open({
        type: 1,
        title: Msg.Lang['shell.uploading'] + "...",
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_NAV,
        resize: false,
        closeBtn: 0,
        success: function (layero, index) {
            $(".layui-layer-page").css("z-index", "198910151");
            $("#mixly-loader-btn").off("click").click(() => {
                $("#mixly-loader-btn").css('display', 'none');
                layer.title(Msg.Lang['shell.aborting'] + '...', index);
                ArduShell.cancel();
            });
            mainStatusBarTabs.show();
            statusBarTerminal.setValue(Msg.Lang['shell.uploading'] + "...\n");
            const code = MFile.getCode();
            Socket.sendCommand({
                obj: 'ArduShell',
                func: 'upload',
                args: [ index, boardType, port, code ]
            });
        },
        end: function () {
            $('#mixly-loader-div').css('display', 'none');
            $("layui-layer-shade" + layerNum).remove();
            $("#mixly-loader-btn").off("click");
            $("#mixly-loader-btn").css('display', 'inline-block');
        }
    }); 
}

ArduShell.operateSuccess = (type, layerNum, port, baud, timeCostStr) => {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    layer.close(layerNum);
    const value = statusBarTerminal.getValue();
    let prefix = '';
    if (value.lastIndexOf('\n') !== value.length - 1) {
        prefix = '\n';
    }
    statusBarTerminal.addValue(prefix);
    const message = (type === 'compile' ? Msg.Lang['shell.compileSucc'] : Msg.Lang['shell.uploadSucc']);
    statusBarTerminal.addValue("==" + message + "(" + Msg.Lang['shell.timeCost'] + " " + timeCostStr + ")==\n");
    layer.msg(message, {
        time: 1000
    });
    if (type === 'upload' && port) {
        Serial.connect(port, baud - 0);
    }
    ArduShell.compiling = false;
    ArduShell.uploading = false;
}

ArduShell.operateOnError = (type, layerNum, error) => {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    statusBarTerminal.addValue(error);
}

ArduShell.operateEndError = (type, layerNum, error) => {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    layer.close(layerNum);
    const value = statusBarTerminal.getValue();
    let prefix = '';
    if (value.lastIndexOf('\n') !== value.length - 1) {
        prefix = '\n';
    }
    statusBarTerminal.addValue(prefix);
    error && statusBarTerminal.addValue(error + '\n');
    const message = (type === 'compile' ? Msg.Lang['shell.compileFailed'] : Msg.Lang['shell.uploadFailed']);
    statusBarTerminal.addValue("==" + message + "==\n");
    ArduShell.compiling = false;
    ArduShell.uploading = false;
}

/**
* @function 取消编译或上传
* @description 取消正在执行的编译或上传过程
* @return void
*/
ArduShell.cancel = function () {
    Socket.sendCommand({
        obj: 'ArduShell',
        func: 'cancel',
        args: []
    });
}

ArduShell.addValue = function (data) {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    statusBarTerminal.addValue(data);
}

});