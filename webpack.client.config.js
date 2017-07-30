const path = require("path");

const moduleConfig = require(path.resolve(__dirname, 'src', "module-config"));

module.exports = {
	module: moduleConfig,
	entry: {
	    app: path.resolve(__dirname, 'src/js/', 'app.js')
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js"
    }	
};