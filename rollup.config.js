import multiEntry from 'rollup-plugin-multi-entry';
import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'coreutil',
    entry: "src/main/**/*.js",
    dest: "umd/coreutil.js",
    format: "umd",
    sourceMap: "inline",
    plugins: [
        multiEntry(),
        babel()
    ]
}
