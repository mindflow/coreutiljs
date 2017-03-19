import multiEntry from 'rollup-plugin-multi-entry';
import * as path from 'path';

export default {
    moduleName: 'coreutil',
    entry: "src/**/*.js",
    dest: "target/coreutil.js",
    format: "umd",
    sourceMap: "inline",
    plugins: [
        multiEntry()
    ]
}
