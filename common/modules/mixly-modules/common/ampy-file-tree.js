goog.loadJs('common', () => {

goog.require('Mixly.FileTree');
goog.require('Mixly.Electron.AmpyFS');
goog.require('Mixly.Web.AmpyFS');
goog.provide('Mixly.AmpyFileTree');

const {
    FileTree,
    Electron = {},
    Web = {}
} = Mixly;

const { AmpyFS } = goog.isElectron? Electron : Web;


class AmpyFileTree extends FileTree {
    constructor() {
        super(new AmpyFS());
    }

    async readFolder(inPath) {
        let output = [];
        const fs = this.getFS();
        const [_a, status] = await fs.isDirectory(inPath);
        if (!status) {
            return output;
        }
        const [_b, children] = await fs.readDirectory(inPath);
        for (let data of children) {
            if (!data) {
                continue;
            }
            const dataPath = data[0];
            const isDirectory = ['dir', 'empty dir'].includes(data[1]);
            if (isDirectory) {
                const isDirEmtpy = data[1] === 'empty dir';
                output.push({
                    type: 'folder',
                    id: dataPath,
                    children: !isDirEmtpy
                });
            } else {
                output.push({
                    type: 'file',
                    id: dataPath,
                    children: false
                });
            }
        }
        return output;
    }
}

Mixly.AmpyFileTree = AmpyFileTree;

});