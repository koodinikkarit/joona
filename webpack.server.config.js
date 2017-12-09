const path = require("path");
const moduleConfig = require(path.resolve(__dirname, "src", "module-config"));
const pluginsConfig = require(path.resolve(__dirname, "src", "plugins-config"));

module.exports = {
	target: "node",
	module: moduleConfig,
	entry: {
		app: path.resolve(__dirname, "src", "app.js")
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "joona.js"
	},
	plugins: pluginsConfig
};