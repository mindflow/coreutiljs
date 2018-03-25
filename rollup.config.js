import multiEntry from 'rollup-plugin-multi-entry';
import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'coreutil',
    input: "src/main/**/*.js",
    output: {
        file: "umd/coreutil.js",
        format: "umd"
    },
    sourceMap: "inline",
    plugins: [
        multiEntry(),
        babel()
    ]
}
