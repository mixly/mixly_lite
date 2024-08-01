const shell = require('shelljs');
const fs = require('fs');
const fs_plus = require('fs-plus');
const path = require('path');
const { Command, Option } = require('commander');

const program = new Command();

program
    .addOption(new Option('-t, --type <string>', 'boards type', 'micropython').choices([
        'all', 'arduino', 'micropython', 'python'
    ]));

program.parse();

const options = program.opts();

let ignore = ['arduino', 'micropython', 'python'];

if (ignore.includes(options.type)) {
    ignore.splice(ignore.indexOf(options.type), 1);
} else if (options.type === 'all') {
    ignore = [];
}

const ORIGIN_DIR = process.cwd();
const DEFAULT_SRC_DIR = path.resolve(ORIGIN_DIR, 'boards/default_src');

if (fs_plus.isDirectorySync(DEFAULT_SRC_DIR)) {
    const names = fs.readdirSync(DEFAULT_SRC_DIR);
    for (let name of names) {
        let splitName = name.split('_');
        if (ignore.includes(splitName[0])) {
            continue;
        }
        const now = path.resolve(DEFAULT_SRC_DIR, name);
        if (!fs_plus.isDirectorySync(now)) {
            continue;
        }
        const packagejsonPath = path.resolve(now, 'package.json');
        if (!fs_plus.isFileSync(packagejsonPath)) {
            continue;
        }
        shell.cd(now);
        shell.exec('npm run publish:board');
    }
}