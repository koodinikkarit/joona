const path = require("path");
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const moduleConfig = require(path.resolve(__dirname, "src", "module-config"));

module.exports = {
	module: moduleConfig,
	entry: {
		app: path.resolve(__dirname, "src/js/", "app.js")
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerPort: 4567
		})
	],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "app.js"
	}
};