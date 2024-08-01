const fs = require('fs');
const fs_extra = require('fs-extra');
const fs_plus = require('fs-plus');
const path = require('path');

const scanDir = (dirPath, ignore, rootPath) => {
    let googList = [];
    const dirName = path.basename(dirPath);
    const dirIgnore = ignore?.dir ?? [];
    const fileIgnore = ignore?.file ?? [];
    if (!fs_plus.isDirectorySync(dirPath) || dirIgnore.includes(dirPath)) {
        return googList;
    }

    let nameList = fs.readdirSync(dirPath);
    for (let i = 0; i < nameList.length; i++) {
        let childPath = path.join(dirPath, nameList[i]);
        if (fs_plus.isFileSync(childPath)) {
            let googObj = scanFile(childPath, ignore, rootPath);
            if (!googObj) {
                continue;
            }
            googList.push(googObj);
        } else {
            googList = [...googList, ...scanDir(childPath, ignore, rootPath)];
        }
    }

    return googList;
}

const scanFile = (filePath, ignore, rootPath) => {
    const fileIgnore = ignore?.file ?? [];
    if (fileIgnore.includes(filePath)) {
        return null;
    }
    let jsStr = fs.readFileSync(filePath, 'utf8');
    let googObj = {};
    googObj.path = '/' + path.relative(rootPath, filePath).replaceAll('\\', '/');
    googObj.require = match('goog.require', jsStr);
    googObj.provide = match("goog.provide", jsStr);
    if (googObj.require || googObj.provide) {
        if (!googObj.require) {
            googObj.require = [];
        }
        if (!googObj.provide) {
            googObj.provide = [];
        }
    } else {
        googObj = null;
    }
    return googObj;
}

const match = (type, jsStr) => {
    let list = [];
    if (type === 'goog.require') {
        list = jsStr.match(/(?<=goog.require[\s]*\(["|'])[^"|']+(?=["|'][\s]*\))/g);
    } else {
        list = jsStr.match(/(?<=goog.provide[\s]*\(["|'])[^"|']+(?=["|'][\s]*\))/g);
    }
    if (list) {
        list = unique(list);
    }
    return list;
}

// 数组去重
const unique = (list) => {
    return Array.from(new Set(list));
}

const generate = (needBuildDir, ignore) => {
    let outputConfig = [];
    outputConfig = scanDir(needBuildDir, ignore, needBuildDir);
    return outputConfig;
}

module.exports = {
    generate: generate
};