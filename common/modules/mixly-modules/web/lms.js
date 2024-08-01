goog.loadJs('web', () => {

goog.require('saveAs');
goog.require('Blob');
goog.require('Blockly');
goog.require('Mixly.MFile');
goog.require('Mixly.Config');
goog.require('Mixly.MicrobitFs');
goog.require('Mixly.LocalStorage');
goog.require('Mixly.Web.File');
goog.provide('Mixly.Web.Lms');

const {
    Web,
    MFile,
    Config,
    MicrobitFs,
    LocalStorage
} = Mixly;

const { File, Lms } = Web;

const { BOARD } = Config;

const DOM_STR = `
<li class="layui-nav-item" lay-unselect="">
    <a href="#" class="icon-upload">保存到教学平台</a>
</li>
`;

Lms.getUrlParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");  // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  // 匹配目标参数
    if (r != null) return unescape(r[2]); return null;  // 返回参数值
}

Lms.save2moodle = function() {
    var id = Lms.getUrlParam('id');
    var hash = Lms.getUrlParam('hash');
    var userid = Lms.getUrlParam('userid');
    var taskid = Lms.getUrlParam('taskid');
    if (id == null || hash == null || userid == null) {
        alert('参数有误，请检查(请从作业进入)');
        return false;
    }
    var data = '';
    data = MFile.getCode();
    type = 'py';
    var xml = Blockly.Xml.workspaceToDom(Mixly.Editor.blockEditor);
    data = Blockly.Xml.domToText(xml);
    type = 'xml';
    $.post('../../post_server_js.php', { unionid: id, hash: hash, userid: userid, content: data, type: type }, function (result) {
        var json = eval('(' + result + ')');
        alert(json.result);
    });
}

Lms.loadfrommoodle = function() {
    // 当有localStorage缓存时，不从api接口中读取数据，否则api读取后会存在localStorage中，重复显示出来 add by qiang 20180521
    var xml_str = LocalStorage.get(BOARD.boardType);
    var pattern = /<xml[\w\W]*?>(.*)<\/xml>/i
    var code = pattern.exec(xml_str)

    if (code != null && code[1] != '') {
        console.log(code[1]);
        console.log('read from localStorage');
        return false;
    }
    var data = '';
    var type = 'xml';
    var id = Lms.getUrlParam('id');
    var hash = Lms.getUrlParam('hash');
    var userid = Lms.getUrlParam('userid');
    var taskid = Lms.getUrlParam('taskid');
    if (id == null || hash == null || userid == null) {
        // alert('参数有误，请检查');
        return false;
    }
    $.post('../../get_content_microbitpy.php', { unionid: id, hash: hash, userid: userid, content: data }, function (result) {
        const { blockEditor } = Editor;
        if (result == '') {
            return;
        } else {
            var count = blockEditor.getAllBlocks().length;
            if (count) {
                blockEditor.clear();
            }
            type = result.substr(0, 3);
            data = result.substr(3);
        }
        File.parseData(`.${type}`, data);
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
        }
        selectFile.click();
    });
}

Lms.save2hex = function() {
    const code = MFile.getCode();
    const output = MicrobitFs.getHex(code);
    var blob = new Blob([output], { type: 'text/xml' });
    saveAs(blob, 'blockduino.hex');
}

Lms.changeState = function() {
    var id = Lms.getUrlParam('id');
    var hash = Lms.getUrlParam('hash');
    var userid = Lms.getUrlParam('userid');
    var taskid = Lms.getUrlParam('taskid');
    if (id == null || hash == null || userid == null) {
        return false;
    }
    const $dom = $(DOM_STR);
    $dom.find('a').off().click(() => {
        Lms.save2moodle();
    })
    $('#nav #nav-right-btn-list').append($dom);
    Lms.loadfrommoodle(); 
}


});