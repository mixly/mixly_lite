const fs = require('fs');
const fs_extra = require('fs-extra');
const fs_plus = require('fs-plus');
const build_deps = require('./build-deps.js');
const path = require('path');

const config = {
    "workPath": __dirname,
    "fileIgnore": [
        path.resolve(__dirname, '../common/modules/mixly-modules/mixly.min.js')
    ],
    "dirIgnore": []
};

const needBuildDirList = [
    path.resolve(__dirname, '../mixly-sw/mixly-modules/'),
    path.resolve(__dirname, '../common/modules/mixly-modules/')
];

const generateDeps = () => {
    for (let needBuildDir of needBuildDirList) {
        let fileIgnore = [];
        let dirIgnore = [];
        if (typeof config.fileIgnore === 'object') {
            for (let data of config.fileIgnore) {
                fileIgnore.push(path.resolve(needBuildDir, data));
            }
        }
        if (typeof config.dirIgnore === 'object') {
            for (let data of config.dirIgnore) {
                dirIgnore.push(path.resolve(needBuildDir, data));
            }
        }
        let outputConfig = [];
        console.log('deps.json生成中...');
        const ignore = {
            dir: dirIgnore,
            file: fileIgnore
        };
        outputConfig = build_deps.generate(needBuildDir, ignore);
        fs_extra.outputJsonSync(path.join(needBuildDir, 'deps.json'), outputConfig, {
            spaces: '    '
        });
        console.log(path.join(needBuildDir, 'deps.json') + '生成成功');
    }
}

generateDeps();