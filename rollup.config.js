import multiEntry from 'rollup-plugin-multi-entry';

export default {
    moduleName: 'coreutil',
    entry: "src/main/**/*.js",
    dest: "target/coreutil.js",
    format: "umd",
    sourceMap: "inline",
    plugins: [
        multiEntry()
    ]
}
