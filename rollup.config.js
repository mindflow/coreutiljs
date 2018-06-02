import multiEntry from 'rollup-plugin-multi-entry';

export default [{
    input: "src/**/*.js",
    output: {
        name: 'coreutil_v1',
        file: "bundle/jsm/coreutil_v1.js",
        sourcemap: "inline",
        format: "es"
    },
    plugins: [
        multiEntry()
    ]
},{
    input: "src/**/*.js",
    output: {
        name: 'coreutil_v1',
        file: "bundle/cjs/coreutil_v1.js",
        sourcemap: "inline",
        format: "cjs"
    },
    plugins: [
        multiEntry()
    ]
}]
