/**
 * Wrapper for microbit-fs and microbit-universal-hex to perform filesystem
 * operations into two hex files.
 *   https://github.com/microbit-foundation/microbit-fs
 *   https://github.com/microbit-foundation/microbit-universal-hex
 */
goog.loadJs('common', () => {

'use strict';
goog.require('microbitFs');
goog.provide('fsWrapper');
/**
 * @returns An object with the fs wrapper.
 */
var uPyFs = null;
var commonFsSize = 20 * 1024;
var passthroughMethods = [
    'create',
    'exists',
    'getStorageRemaining',
    'getStorageSize',
    'getStorageUsed',
    'getUniversalHex',
    'ls',
    'read',
    'readBytes',
    'remove',
    'size',
    'write',
];

/**
 * Duplicates some of the methods from the MicropythonFsHex class by
 * creating functions with the same name in this object.
 */
function duplicateMethods() {
    passthroughMethods.forEach(function(method) {
        fsWrapper[method] = function() {
            return uPyFs[method].apply(uPyFs, arguments);
        };
    });
}

/**
 * Fetches both MicroPython hexes and sets up the file system with the
 * initial main.py
 */
fsWrapper.setupFilesystem = function() {
    var uPyV1 = null;
    var uPyV2 = null;

    var deferred1 = $.get('../common/micropython/microbit-micropython-v1.hex', function(fileStr) {
        uPyV1 = fileStr;
    }).fail(function() {
        console.error('Could not load the MicroPython v1 file.');
    });
    var deferred2 = $.get('../common/micropython/microbit-micropython-v2.hex', function(fileStr) {
        uPyV2 = fileStr;
    }).fail(function() {
        console.error('Could not load the MicroPython v2 file.');
    });

    return $.when(deferred1, deferred2).done(function() {
        if (!uPyV1 || !uPyV2) {
            console.error('There was an issue loading the MicroPython Hex files.');
        }
        // TODO: We need to use ID 9901 for app compatibility, but can soon be changed to 9900 (as per spec)
        uPyFs = new microbitFs.MicropythonFsHex([
            { hex: uPyV1, boardId: 0x9901 },
            { hex: uPyV2, boardId: 0x9903 },
        ], {
            'maxFsSize': commonFsSize,
        });
        duplicateMethods();
    });
};

/**
 * @param {string} boardId String with the Board ID for the generation.
 * @returns Uint8Array with the data for the given Board ID.
 */
fsWrapper.getBytesForBoardId = function(boardId) {
    if (boardId == '9900' || boardId == '9901') {
        return uPyFs.getIntelHexBytes(0x9901);
    } else if (boardId == '9903' || boardId == '9904') {
        return uPyFs.getIntelHexBytes(0x9903);
    } else {
        throw Error('Could not recognise the Board ID ' + boardId);
    }
};

/**
 * @param {string} boardId String with the Board ID for the generation.
 * @returns ArrayBuffer with the Intel Hex data for the given Board ID.
 */
fsWrapper.getIntelHexForBoardId = function(boardId) {
    if (boardId == '9900' || boardId == '9901') {
        var hexStr = uPyFs.getIntelHex(0x9901);
    } else if (boardId == '9903' || boardId == '9904') {
        var hexStr = uPyFs.getIntelHex(0x9903);
    } else {
        throw Error('Could not recognise the Board ID ' + boardId);
    }
    // iHex is ASCII so we can do a 1-to-1 conversion from chars to bytes
    var hexBuffer = new Uint8Array(hexStr.length);
    for (var i = 0, strLen = hexStr.length; i < strLen; i++) {
        hexBuffer[i] = hexStr.charCodeAt(i);
    }
    return hexBuffer.buffer;
};

/**
 * Import the files from the provide hex string into the filesystem.
 * If the import is successful this deletes all the previous files.
 *
 * @param {string} hexStr Hex (Intel or Universal) string with files to
 *     import.
 * @return {string[]} Array with the filenames of all files imported.
 */
fsWrapper.importHexFiles = function(hexStr) {
    var filesNames = uPyFs.importFilesFromHex(hexStr, {
        overwrite: true,
        formatFirst: true
    });
    if (!filesNames.length) {
        throw new Error('The filesystem in the hex file was empty');
    }
    return filesNames;
};

/**
 * Import an appended script from the provide hex string into the filesystem.
 * If the import is successful this deletes all the previous files.
 *
 * @param {string} hexStr Hex (Intel or Universal) string with files to
 *     import.
 * @return {string[]} Array with the filenames of all files imported.
 */
fsWrapper.importHexAppended = function(hexStr) {
    var code = microbitFs.getIntelHexAppendedScript(hexStr);
    if (!code) {
        throw new Error('No appended code found in the hex file');
    };
    uPyFs.ls().forEach(function(fileName) {
        uPyFs.remove(fileName);
    });
    uPyFs.write('main.py', code);
    return ['main.py'];
};

});