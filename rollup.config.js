import multiEntry from 'rollup-plugin-multi-entry';
import { uglify } from "rollup-plugin-uglify";

export default [{
    input: "src/**/*.js",
    output: {
        name: 'coreutil_v1',
        file: "dist/jsm/coreutil_v1.js",
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
        file: "dist/cjs/coreutil_v1.js",
        sourcemap: "inline",
        format: "cjs"
    },
    plugins: [
        multiEntry()
    ]
}]
