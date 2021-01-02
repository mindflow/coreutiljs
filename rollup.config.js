import multi from '@rollup/plugin-multi-entry';
import { terser } from "rollup-plugin-terser";

export default [{
    input: "src/**/*.js",
    output: {
        name: 'coreutil_v1',
        file: "dist/jsm/coreutil_v1.js",
        sourcemap: "inline",
        format: "es"
    },
    plugins: [
        multi()
    ]
},{
    input: "src/**/*.js",
    output: {
        name: 'coreutil_v1',
        file: "dist/jsm/coreutil_v1.min.js",
        format: "es"
    },
    plugins: [
        multi(),
        terser()
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
        multi()
    ]
}]
