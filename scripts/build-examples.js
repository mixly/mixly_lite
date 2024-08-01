const fs_extra = require('fs-extra');
const fs_plus = require('fs-plus');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { Command, Option } = require('commander');

const program = new Command();

program
    .addOption(new Option('-t, --type <string>', 'boards type', 'all').choices([
        'all', 'special'
    ]));

program.parse();

const options = program.opts();

options.type = options.type ?? 'all';

if (options.type === 'special') {
    options.type = path.basename(process.cwd());
}

const generateHash = (inputString) => {
  const hash = crypto.createHash('sha256');
  hash.update(inputString);
  return hash.digest('hex');
}

const getExamples = (dirPath, convertExample = false) => {
    let examples = {};
    if (!fs_plus.isDirectorySync(dirPath)) {
        return examples;
    }
    const dataList = fs.readdirSync(dirPath);
    for (let data of dataList) {
        let dataPath = path.resolve(dirPath, data);
        if (fs_plus.isDirectorySync(dataPath)) {
            let id = data;
            if (convertExample) {
                id = generateHash(data);
                const newDataPath = path.resolve(dirPath, id);
                fs.renameSync(dataPath, newDataPath);
                dataPath = newDataPath;
            }
            const children = getExamples(dataPath, convertExample);
            if (!Object.keys(children).length) {
                continue;
            }
            examples[id] = {
                ...children,
                '__file__': false,
                '__name__': data
            };
        } else {
            const extname = path.extname(data);
            if (extname !== '.mix') {
                continue;
            }
            let id = data;
            if (convertExample) {
                id = generateHash(data) + extname;
                const newDataPath = path.resolve(dirPath, id);
                fs.renameSync(dataPath, newDataPath);
                dataPath = newDataPath;
            }
            examples[id] = {
                '__file__': true,
                '__name__': data
            };
        }
    }
    return examples;
}

const ORIGIN_DIR = path.resolve(__dirname, '../');
const DEFAULT_SRC_DIR = path.resolve(ORIGIN_DIR, 'boards/default_src');

if (fs_plus.isDirectorySync(DEFAULT_SRC_DIR)) {
    const names = fs.readdirSync(DEFAULT_SRC_DIR);
    for (let name of names) {
        if (!['all', name].includes(options.type)) {
            continue;
        }
        const now = path.resolve(DEFAULT_SRC_DIR, name);
        if (!fs_plus.isDirectorySync(now)) {
            continue;
        }
        const examplesPath = path.resolve(now, 'origin/examples');
        if (!fs_plus.isDirectorySync(examplesPath)) {
            continue;
        }
        let outputPath = path.resolve(examplesPath, 'map.json');
        let output = getExamples(examplesPath);
        fs_extra.outputJsonSync(outputPath, output, {
            spaces: '    '
        });
    }
}

const DEFAULT_DIR = path.resolve(ORIGIN_DIR, 'boards/default');

if (fs_plus.isDirectorySync(DEFAULT_DIR)) {
    const names = fs.readdirSync(DEFAULT_DIR);
    for (let name of names) {
        if (!['all', name].includes(options.type)) {
            continue;
        }
        const now = path.resolve(DEFAULT_DIR, name);
        if (!fs_plus.isDirectorySync(now)) {
            continue;
        }
        const examplesPath = path.resolve(now, 'examples');
        if (!fs_plus.isDirectorySync(examplesPath)) {
            continue;
        }
        let outputPath = path.resolve(examplesPath, 'map.json');
        let output = getExamples(examplesPath, true);
        fs_extra.outputJsonSync(outputPath, output, {
            spaces: '    '
        });
    }
}