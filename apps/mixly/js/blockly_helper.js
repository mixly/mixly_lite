/**
 * Execute the user's code.
 * Just a quick and dirty eval.  No checks for infinite loops, etc.
 */
function runJS() {
    var code = Blockly.Generator.workspaceToCode('JavaScript');
    try {
        eval(code);
    } catch (e) {
        alert('Program error:\n' + e);
    }
}

/**
 * Backup code blocks to localStorage.
 */
function backup_blocks() {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    xml = Blockly.Xml.domToText(xml);
    if ('localStorage' in window && window['localStorage'] != null) {
        window.localStorage.setItem('arduino', xml);
    } else {
        //当同时打开打开两个以上（含两个）的Mixly窗口时，只有第一个打开的窗口才有window.localStorage对象，怀疑是javafx的bug.
        //其他的窗口得通过java写cache文件来实现，否则这些窗口在普通、高级视图中进行切换时，无法加载切换之前的块
        JSFuncs.saveToLocalStorageCache(xml);
    }
}

function clear_blocks_from_storage() {
    var itl = setInterval(function () {
        if (window) {
            if ('localStorage' in window && window['localStorage'] != null && window.localStorage.arduino) {
                window.localStorage.removeItem('arduino');
            } else {
                JSFuncs.saveToLocalStorageCache("<xml></xml>");
            }
            Blockly.mainWorkspace.clear();
            clearInterval(itl);
        }
    }, 200);
}

/**
 * Restore code blocks from localStorage.
 */
function restore_blocks() {
    var xml;
    if ('localStorage' in window && window['localStorage'] != null && window.localStorage.arduino) {
        xml = Blockly.Xml.textToDom(window.localStorage.arduino);
    } else {
        xml = Blockly.Xml.textToDom(JSFuncs.loadFromLocalStorageCache());
    }
    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
}

/**
 * Save blocks to local file.
 * better include Blob and FileSaver for browser compatibility
 */
function save() {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var data = Blockly.Xml.domToText(xml);

    // Store data in blob.
    // var builder = new BlobBuilder();
    // builder.append(data);
    // saveAs(builder.getBlob('text/plain;charset=utf-8'), 'blockduino.xml');
    console.log("saving blob");
    var blob = new Blob([data], { type: 'text/xml' });
    saveAs(blob, 'blockduino.xml');
}

/**
 * Load blocks from local file.
 */
function load(event) {
    var files = event.target.files;
    // Only allow uploading one file.
    if (files.length != 1) {
        return;
    }

    // FileReader
    var reader = new FileReader();
    reader.onloadend = function (event) {
        var target = event.target;
        // 2 == FileReader.DONE
        if (target.readyState == 2) {
            try {
                var xml = Blockly.Xml.textToDom(target.result);
            } catch (e) {
                alert('Error parsing XML:\n' + e);
                return;
            }
            var count = Blockly.mainWorkspace.getAllBlocks().length;
            if (count && confirm('Replace existing blocks?\n"Cancel" will merge.')) {
                Blockly.mainWorkspace.clear();
            }
            Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
        }
        // Reset value of input after loading because Chrome will not fire
        // a 'change' event if the same file is loaded again.
        document.getElementById('load').value = '';
    };
    reader.readAsText(files[0]);
}

/**
 * Discard all blocks from the workspace.
 */
function discard() {
    var count = Blockly.mainWorkspace.getAllBlocks().length;
    if (count < 2 || window.confirm('Delete all ' + count + ' blocks?')) {
        Blockly.mainWorkspace.clear();
        renderContent();
    }
}

/*
 * auto save and restore blocks
 */
function auto_save_and_restore_blocks() {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(restore_blocks, 200);
    // Hook a save function onto unload.
    bindEvent(window, 'unload', backup_blocks);
    tabClick(selected);

    // Init load event.
    var loadInput = document.getElementById('load');
    loadInput.addEventListener('change', load, false);
    document.getElementById('fakeload').onclick = function () {
        loadInput.click();
    };
}

/**
 * Bind an event to a function call.
 * @param {!Element} element Element upon which to listen.
 * @param {string} name Event name to listen to (e.g. 'mousedown').
 * @param {!Function} func Function to call when event is triggered.
 *     W3 browsers will call the function with the event object as a parameter,
 *     MSIE will not.
 */
function bindEvent(element, name, func) {
    if (element.addEventListener) {  // W3C
        element.addEventListener(name, func, false);
    } else if (element.attachEvent) {  // IE
        element.attachEvent('on' + name, func);
    }
}

//loading examples via ajax
var ajax;
function createAJAX() {
    if (window.ActiveXObject) { //IE
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {
                return null;
            }
        }
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else {
        return null;
    }
}

function onSuccess() {
    if (ajax.readyState == 4) {
        if (ajax.status == 200) {
            try {
                var xml = Blockly.Xml.textToDom(ajax.responseText);
            } catch (e) {
                alert('Error parsing XML:\n' + e);
                return;
            }
            var count = Blockly.mainWorkspace.getAllBlocks().length;
            if (count && confirm('Replace existing blocks?\n"Cancel" will merge.')) {
                Blockly.mainWorkspace.clear();
            }
            Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
        } else {
            //alert("Server error");
        }
    }
}

function load_by_url(uri) {
    ajax = createAJAX();
    if (!ajax) {
        alert('Not compatible with XMLHttpRequest');
        return 0;
    }
    if (ajax.overrideMimeType) {
        ajax.overrideMimeType('text/xml');
    }

    ajax.onreadystatechange = onSuccess;
    ajax.open("GET", uri, true);
    ajax.send("");
}

function uploadCode(code, callback) {
    var target = document.getElementById('content_arduino');
    var spinner = new Spinner().spin(target);

    var url = "http://127.0.0.1:8080/";
    var method = "POST";

    // You REALLY want async = true.
    // Otherwise, it'll block ALL execution waiting for server response.
    var async = true;

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState != 4) {
            return;
        }

        spinner.stop();

        var status = parseInt(request.status); // HTTP response status, e.g., 200 for "200 OK"
        var errorInfo = null;
        switch (status) {
            case 200:
                break;
            case 0:
                errorInfo = "code 0\n\nCould not connect to server at " + url + ".  Is the local web server running?";
                break;
            case 400:
                errorInfo = "code 400\n\nBuild failed - probably due to invalid source code.  Make sure that there are no missing connections in the blocks.";
                break;
            case 500:
                errorInfo = "code 500\n\nUpload failed.  Is the Arduino connected to USB port?";
                break;
            case 501:
                errorInfo = "code 501\n\nUpload failed.  Is 'ino' installed and in your path?  This only works on Mac OS X and Linux at this time.";
                break;
            default:
                errorInfo = "code " + status + "\n\nUnknown error.";
                break;
        };

        callback(status, errorInfo);
    };

    request.open(method, url, async);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    request.send(code);
}

function uploadClick() {
    var code = document.getElementById('textarea_arduino').value;

    alert("Ready to upload to Arduino.\n\nNote: this only works on Mac OS X and Linux at this time.");

    uploadCode(code, function (status, errorInfo) {
        if (status == 200) {
            alert("Program uploaded ok");
        } else {
            alert("Error uploading program: " + errorInfo);
        }
    });
}

function resetClick() {
    var code = "void setup() {} void loop() {}";

    uploadCode(code, function (status, errorInfo) {
        if (status != 200) {
            alert("Error resetting program: " + errorInfo);
        }
    });
}

'use strict';

/** Create a namespace for the application. */

goog.require('Blockly.Generator');
goog.require('Blockly.Arduino');

var mixlyjs = mixlyjs || {};
mixlyjs.hex = "";

mixlyjs.createFn = function () {
    if (document.getElementById("username") === null) {
        mixlyjs.discardAllBlocks();
    } else {
        //$("#opModal").load(mixlyjs.modalPagesPath + "create_new_project.html");
        $('#opModal').modal('show');
    }
};

/**
 *clear the mainWorkSpace 
 */
mixlyjs.discardAllBlocks = function () {
    Blockly.mainWorkspace.clear();
    renderContent();
};

mixlyjs.operateModal = function (action) {
    $("#opModal").modal(action);
};

mixlyjs.translateQuote = function (str, trimEscaped) {
    var xml = "";
    var hasComleteAngleBracket = true;
    var lenStr = str.length;
    for (var i = 0; i < lenStr; i++) {
        if (str[i] === "<") {
            hasComleteAngleBracket = false;
        } else if (str[i] === ">") {
            hasComleteAngleBracket = true;
        }

        if (trimEscaped === true
            && hasComleteAngleBracket === false
            && i + 1 < lenStr
            && str[i] === "\\"
            && str[i + 1] === '"') {
            i += 1;
        }

        if (trimEscaped === false
            && hasComleteAngleBracket === false
            && i > 0
            && str[i - 1] !== "\\"
            && str[i] === '"') {
            xml += "\\";
        }
        xml += str[i];
    }
    return xml;
}

mixlyjs.getBoardFromXml = function (xml) {
    if (xml.indexOf("board=\"") === -1) {
        var idxa = xml.indexOf("board=\\\"") + 7;
        var idxb = xml.indexOf("\"", idxa + 1);
        if (idxa !== -1 && idxb !== -1 && idxb > idxa)
            return xml.substring(idxa + 1, idxb - 1);
    } else {
        var idxa = xml.indexOf("board=\"") + 6;
        var idxb = xml.indexOf("\"", idxa + 1);
        if (idxa !== -1 && idxb !== -1 && idxb > idxa)
            return xml.substring(idxa + 1, idxb);
    }
    return undefined;
}

/*处理ardunio板子之间的互相切换*/
mixlyjs.changeBoardName = function (xmlContent, cb) {
    var itl = setInterval(function () {
        if (compilerflasher.loadedBoardList == true) {

            var boardName = mixlyjs.getBoardFromXml(xmlContent);
            if (boardName !== undefined) {
                var boardProfileName = boardName.replace(/\[.*?\]/, "");
                if (profile[boardProfileName] === undefined) {
                    alert("错误：确保板子名称和boardList里的一致！");
                    clearInterval(itl);
                    return;
                }
                $("#cb_cf_boards").val(boardName);
                profile['default'] = profile[boardProfileName];
            } else {
                profile['default'] = profile[$("#cb_cf_boards").find("option:selected").text().replace(/\[.*?\]/, "")];
            }
            cb();
            clearInterval(itl);
        }
    }, 200);

}

mixlyjs.renderXml = function (xmlContent) {
    try {
        var xml = Blockly.Xml.textToDom(xmlContent);
        Blockly.mainWorkspace.clear();
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
        renderContent();
    } catch (e) {
        alert("invalid xml file!");
        console.log(e);
        return;
    }
};
mixlyjs.renderIno = function (xmlContent) {
    tabClick('arduino');
    editor.setValue(xmlContent, -1);
};
mixlyjs.isArduino = function (board) {
    return board.indexOf("Arduino") !== -1;
}
mixlyjs.isMicrobitjs = function (board) {
    return board === "microbit[js]";
}
mixlyjs.isMicrobitpy = function (board) {
    return board === "microbit[py]";
}
mixlyjs.isMixpy = function (board) {
    return board === "mixpy";
}
mixlyjs.isSameTypeBoard = function (boarda, boardb) {
    if (boarda.indexOf("Arduino") !== -1 && boardb.indexOf("Arduino") !== -1)
        return true;
    else if (boarda == boardb)
        return true;
    else
        return false;
}
mixlyjs.getFileSuffix = function (fname) {
    return fname.substring(fname.lastIndexOf(".") + 1);
}

mixlyjs.loadLocalFile = function () {
    // Create event listener function
    var parseInputXMLfile = function (e) {
        var files = e.target.files;
        var reader = new FileReader();
        reader.onload = function () {
            var text = mixlyjs.translateQuote(reader.result, true);
            var filesuffix = files[0].name.split(".")[files[0].name.split(".").length - 1];

            if (filesuffix === "xml" || filesuffix === "mix") {
                var newboard = mixlyjs.getBoardFromXml(text)
                if (newboard !== undefined) {
                    mixlyjs.renderXml(text);
                } else {
                    alert("Error:could not read board from xml!!");
                }
            } else if (filesuffix === "py") {
                mixlyjs.renderIno(text);
            } else {
                alert("Invalid file type! (.ino|.xml|.mix|.js|.py|.hex file supported)");
                return;
            }
        };
        reader.readAsText(files[0]);
    };
    // Create once invisible browse button with event listener, and click it
    var selectFile = document.getElementById('select_file');
    if (selectFile != null) {
        $("#select_file").remove();
        $("#select_file_wrapper").remove();
        selectFile = document.getElementById('select_file');
    }
    if (selectFile == null) {
        var selectFileDom = document.createElement('INPUT');
        selectFileDom.type = 'file';
        selectFileDom.id = 'select_file';

        var selectFileWrapperDom = document.createElement('DIV');
        selectFileWrapperDom.id = 'select_file_wrapper';
        selectFileWrapperDom.style.display = 'none';
        selectFileWrapperDom.appendChild(selectFileDom);

        document.body.appendChild(selectFileWrapperDom);
        selectFile = document.getElementById('select_file');
        //$("body").on('change', '#select_file', parseInputXMLfile);
        $("#select_file").change(parseInputXMLfile);
    }
    selectFile.click();
};

mixlyjs.getCodeContent = function () {
    if (document.getElementById('tab_blocks').className == 'tabon') {
        var board = Code.getStringParamFromUrl("board", "Arduino Nano[atmega328]")
        //	if(mixlyjs.isArduino(board))
        //			return Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace);
        //	else if(mixlyjs.isMicrobitjs(board))
        //	return Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
        //		else if(mixlyjs.isMicrobitpy(board))
        return Blockly.Python.workspaceToCode(Blockly.mainWorkspace);
        //else if(mixlyjs.isMixpy(board))
        //return Blockly.Mixpy.workspaceToCode(Blockly.mainWorkspace);
    } else {
        return editor.getValue();
    }
};

mixlyjs.getXmlContent = function (xmlType) {
    var xmlCodes = goog.string.quote(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)));
    if (xmlType === "project") {
        var boardName = $("#cb_cf_boards").val();
        xmlCodes = xmlCodes.replace("<xml", "<xml version=\\\"mixgo_0.997\\\" board=\\\"" + boardName + "\\\"");
    } else if (xmlType === "lib")
        xmlCodes = xmlCodes.replace("<xml", "<xml version=\\\"mixgo_0.997\\\" board=\\\"" + "mylib" + "\\\"");
    return xmlCodes.substring(1, xmlCodes.length - 1);
};

/**
 * Creates an XML file containing the blocks from the Blockly workspace and
 * prompts the users to save it into their local file system.
 */
mixlyjs.saveXmlFileAs = function () {
    var xmlCodes = mixlyjs.getXmlContent("project");
    var blob = new Blob(
        [xmlCodes],
        { type: 'text/plain;charset=utf-8' });
    saveAs(blob, "Mixgo.xml");
};

mixlyjs.saveInoFileAs = function (f) {
    var xmlCodes = mixlyjs.getCodeContent();
    var board = Code.getStringParamFromUrl("board", "Arduino Nano[atmega328]")
    var filesuffix = ".py";
    var file = (f !== undefined ? f : "mixgo") + filesuffix;
    var blob = new Blob(
        [xmlCodes],
        { type: 'text/plain;charset=utf-8' });
    saveAs(blob, file);
};

mixlyjs.saveCommonFileAs = function (fname, fcontent) {
    var blob = new Blob(
        [fcontent],
        { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fname);
};

mixlyjs.compileMicrobitPy = function () {
    mixlyjs.saveCommonFileAs("binary.hex", doDownload())
}

mixlyjs.setHexContent = function (jsonResponse) {
    var parsed_json = JSON.parse(jsonResponse);
    mixlyjs.hex = parsed_json.output;
    console.log(mixlyjs.hex);
};

mixlyjs.saveBlockImg = function () {
    //this value you can render a much higher resolution image, which looks better on high density displays
    var scaleFactor = 1;

    //Any modifications are executed on a deep copy of the element
    var cp = Blockly.mainWorkspace.svgBlockCanvas_.cloneNode(true);
    cp.removeAttribute("width");
    cp.removeAttribute("height");
    cp.removeAttribute("transform");

    //It is important to create this element in the SVG namespace rather than the XHTML namespace
    var styleElem = document.createElementNS("http://www.w3.org/2000/svg", "style");
    //I've manually pasted codethemicrobit.com's CSS for blocks in here, but that can be removed as necessary
    //styleElem.textContent = Blockly.Css.CONTENT.join('') + ".blocklyToolboxDiv {background: rgba(0, 0, 0, 0.05);}.blocklyMainBackground {stroke:none !important;}.blocklyTreeLabel, .blocklyText, .blocklyHtmlInput {font-family:'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace !important;}.blocklyText { font-size:1rem !important;}.rtl .blocklyText {text-align:right;} .blocklyTreeLabel { font-size:1.25rem !important;} .blocklyCheckbox {fill: #ff3030 !important;text-shadow: 0px 0px 6px #f00;font-size: 17pt !important;}";
    styleElem.textContent = Blockly.Css.CONTENT.join('');
    cp.insertBefore(styleElem, cp.firstChild);

    //Creates a complete SVG document with the correct bounds (it is necessary to get the viewbox right, in the case of negative offsets)
    var bbox = Blockly.mainWorkspace.svgBlockCanvas_.getBBox();
    var xml = new XMLSerializer().serializeToString(cp);
    xml = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + bbox.width + '" height="' + bbox.height + '" viewBox="' + bbox.x + ' ' + bbox.y + ' ' + bbox.width + ' ' + bbox.height + '"><rect width="100%" height="100%" style="fill-opacity:0"></rect>' + xml + '</svg>';
    //If you just want the SVG then do console.log(xml)
    //Otherwise we render as an image and export to PNG
    var svgBase64 = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)));
    //var img = document.createElement('img');
    var img = new Image();
    img.src = svgBase64;

    var canvas = document.createElement("canvas");
    canvas.width = Math.ceil(bbox.width) * scaleFactor;
    canvas.height = Math.ceil(bbox.height) * scaleFactor;
    var ctx = canvas.getContext('2d');
    ctx.scale(scaleFactor, scaleFactor);

    //Might need to be in img.onload(function() {...}) in other browsers
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        //Opens the PNG image in a new tab for copying/saving
        var link = document.createElement('a');
        link.setAttribute('download', 'Mixgo.png');
        link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        link.click();
    };
}