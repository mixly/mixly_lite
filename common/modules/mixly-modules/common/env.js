goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.Url');
goog.provide('Mixly.Env');

const fs_plus = Mixly.require('fs-plus');
const electron_remote = Mixly.require('@electron/remote');
const timers = Mixly.require('node:timers');
const { Env, Url } = Mixly;

/**
  * 检测是否启用node服务器
  * @type {Boolean}
  */
Env.hasSocketServer = false;

/**
  * 检测是否启用node编译服务器
  * @type {Boolean}
  */
Env.hasCompiler = false;

/**
  * 获取当前mixly2.0的路径
  * @type {String}
  */
Env.clientPath = null;

/**
  * 检测当前系统
  * @type {String} win32、darwin、linux
  */
Env.currentPlatform = goog.platform();

/**
  * 对于win系统，获取免安装python3的路径，对于mac与linux，则此变量值为python3
  * @type {String} 
  */
Env.python3Path = null;

/**
  * 获取mixly.py的路径
  * @type {String} 
  */
Env.pyFilePath = null;

/**
  * 获取板卡index或主页面index的路径
  * @type {String} 
  */
Env.indexDirPath = path.join((new URL($('html')[0].baseURI)).href, '../').replace(/file:\/+/g, '');
Env.indexDirPath = decodeURIComponent(Env.indexDirPath);
if (goog.isElectron && ['darwin', 'linux'].includes(Env.currentPlatform)) {
    Env.indexDirPath = '/' + Env.indexDirPath;
}

/**
  * 资源文件夹所在路径
  * @type {String} 
  */
Env.srcDirPath = path.join(Env.indexDirPath, '../');

/**
  * 获取板卡index或主页面index的缩放比例
  * @type {String} 
  */
Env.winSize = null;

/**
  * 获取板卡index默认xml
  * @type {String} 
  */
Env.defaultXML = null;

/**
  * 获取第三方库所用css
  * @type {Array} 
  */
Env.thirdPartyCSS = [];

/**
  * 获取第三方库所用js
  * @type {Array}
  */
Env.thirdPartyJS = [];

/**
  * 默认模板路径
  * @type {String}
  */
Env.templatePath = path.join(goog.basePath, '../templates/');

/**
  * 语言文件路径
  * @type {String}
  */
Env.msgPath = path.join(goog.basePath, '../msg/');

/**
  * 模板index所在路径
  * @type {String}
  */
const urlConfig = Url.getConfig() ?? {};
Env.boardIndexPath = path.join(Env.indexDirPath, '../', urlConfig.boardIndex ?? '');

/**
  * 模板index所在目录路径
  * @type {String}
  */
Env.boardDirPath = path.join(Env.boardIndexPath, '../');

if (goog.isElectron) {
    window.setInterval = timers.setInterval;
    window.clearInterval = timers.clearInterval;
    window.setTimeout = timers.setTimeout;
    window.clearTimeout = timers.clearTimeout;
    window.setImmediate = timers.setImmediate;
    window.clearImmediate = timers.clearImmediate;
    const { app } = electron_remote;
    if (Env.currentPlatform === 'darwin') {
        Env.clientPath = path.join(app.getPath('exe'), '../../../../');
    } else {
        Env.clientPath = path.join(app.getPath('exe'), '../');
    }
    Env.pyFilePath = path.join(Env.clientPath, 'mixpyBuild/mixly.py');
    if (Env.currentPlatform === 'win32') {
        Env.python3Path = path.join(Env.clientPath, 'mixpyBuild/win_python3/python3.exe');
    } else {
        Env.python3Path = '/usr/bin/python3';
        if (fs_plus.isFileSync('/usr/local/bin/python3')) {
            Env.python3Path = '/usr/local/bin/python3';
        }
    }
}

});