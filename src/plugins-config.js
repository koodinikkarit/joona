const webpack = require("webpack");

module.exports = [
	new webpack.DefinePlugin({
		CONFIG: {
			PETRI_IP: '"' + process.env.JOONA_PETRI_IP + '"',
			PETRI_PORT: '"' + process.env.JOONA_PETRI_PORT + '"'
		}
	})
];