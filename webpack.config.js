var path = require('path');

module.exports = {
    entry: {
		coreutil: "./target/coreutil.js"
    },
    output: {
        filename: "coreutil-browser.js",
        library: "coreutil",
        libraryTarget: "var",
		path: path.resolve(__dirname, 'target')
    }
}
