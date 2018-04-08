import multiEntry from 'rollup-plugin-multi-entry';
import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'coreutil',
    input: "src/main/**/*.mjs",
    output: {
        file: "es_module/coreutil.mjs",
        format: "es"
    },
    sourceMap: "inline",
    plugins: [
        multiEntry(),
        babel()
    ]
}
