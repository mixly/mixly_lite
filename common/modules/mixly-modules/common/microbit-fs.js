goog.loadJs('common', () => {

goog.require('fsWrapper');
goog.require('Mixly.Config');
goog.provide('Mixly.MicrobitFs');

const {
    Config,
    MicrobitFs
} = Mixly;

const { BOARD } = Config;

const { nav = {} } = BOARD;

MicrobitFs.init = () => {
    fsWrapper.setupFilesystem()
    .then(() => {
        console.log('初始化成功');
    })
    .fail(() => {
        console.log('初始化失败');
    });
}

if (!nav.compile && nav.upload && nav.save?.hex)
    MicrobitFs.init();

// Reset the filesystem and load the files from this hex file to the fsWrapper and editor
MicrobitFs.loadHex = (filename, hexStr) => {
    var importedFiles = [];
    // If hexStr is parsed correctly it formats the file system before adding the new files
    try {
        importedFiles = fsWrapper.importHexFiles(hexStr);
    } catch (hexImportError) {
        try {
            importedFiles = fsWrapper.importHexAppended(hexStr);
        } catch (appendedError) {
            console.log(hexImportError.message);
        }
    }
    // Check if imported files includes a main.py file
    var code = '';
    if (importedFiles.indexOf(filename) > -1) {
        code = fsWrapper.read(filename);
    } else {
        alert('no ' + filename);
    }
    Editor.mainEditor.drag.full('NEGATIVE'); // 完全显示代码编辑器
    Editor.codeEditor.setValue(code, -1);
}

// Function for adding file to filesystem
MicrobitFs.loadFileToFilesystem = (filename, fileBytes) => {
    // For main.py confirm if the user wants to replace the editor content
    if (filename === 'main.py') {
        return;
    }
    try {
        if (fsWrapper.exists(filename)) {
            fsWrapper.remove(filename);
            fsWrapper.create(filename, fileBytes);
        } else {
            fsWrapper.write(filename, fileBytes);
        }
        // Check if the filesystem has run out of space
        var _ = fsWrapper.getUniversalHex();
    } catch (e) {
        if (fsWrapper.exists(filename)) {
            fsWrapper.remove(filename);
        }
        return alert(filename + '\n' + e.message);
    }
}

MicrobitFs.updateMainPy = (code) => {
    try {
        // Remove main.py if editor content is empty to download a hex file
        // with MicroPython included (also includes the rest of the filesystem)
        if (fsWrapper.exists('main.py')) {
            fsWrapper.remove('main.py');
        }
        for (var i = 0; i < py_module.length; i++) {
            if (fsWrapper.exists(py_module[i]['filename'])) {
                fsWrapper.remove(py_module[i]['filename']);
            }
        }
        if (code) {
            fsWrapper.create('main.py', code);
        }
        var str = code;
        var arrayObj = new Array();
        str.trim().split("\n").forEach(function (v, i) {
            arrayObj.push(v);
        });

        let moduleName = "";
        for (var i = 0; i < arrayObj.length; i++) {
            if (arrayObj[i].indexOf("from") == 0) {
                moduleName = arrayObj[i].substring(4, arrayObj[i].indexOf("import"));
                moduleName = moduleName.replace(/(^\s*)|(\s*$)/g, "");
                if (fsWrapper.exists(moduleName + '.py'))
                    continue;
                for (var j = 0; j < py_module.length; j++) {
                    if (py_module[j]['filename'] == moduleName + ".py") {
                        MicrobitFs.loadFileToFilesystem(py_module[j]['filename'], py_module[j]['code']);
                    }
                }
            } else if (arrayObj[i].indexOf("import") == 0) {
                moduleName = arrayObj[i].substring(6);
                moduleName = moduleName.replace(/(^\s*)|(\s*$)/g, "");
                if (fsWrapper.exists(moduleName + '.py'))
                    continue;
                for (var j = 0; j < py_module.length; j++) {
                    if (py_module[j]['filename'] == moduleName + ".py") {
                        MicrobitFs.loadFileToFilesystem(py_module[j]['filename'], py_module[j]['code']);
                    }
                }
            }
        }
    } catch (e) {
        // We generate a user readable error here to be caught and displayed
        throw new Error(e.message);
    }
}

MicrobitFs.getHex = (code) => {
    try {
        MicrobitFs.updateMainPy(code);
        return output = fsWrapper.getUniversalHex();
    } catch (e) {
        alert(e.message);
        return null;
    }
}

});