import express from "express";
import path from "path";
import webpack from "webpack";
import WebpackMiddleware from "webpack-dev-middleware";
import bodyParser from 'body-parser';

import ssr from "./ssr";

const app = express();

const APP_PORT = 22222;


var entry = {
	app: path.resolve(__dirname, 'js', 'app.js')
};

var module = {
	rules: [
		{
			exclude: /node_modules/,
			loader: 'babel-loader',
			test: /\.js$/,
		},
        {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader"
                },
                {
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                }
            ]
		},
		{
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader'
        }
	]
};

var output = {
	filename: '[name].js',
	path: path.join(__dirname, "./public/") 
};

output.path = "/public/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static('public'));

app.use(WebpackMiddleware(webpack({
	devtool: 'eval',
	entry: entry,
	module: module,
	output: output
}), {
	contentBase: '../public/',
	publicPath: '/js/',
	stats: "errors-only"
}));

ssr(app);

app.listen(APP_PORT, () => {
    console.log("serveri on käynnissä");
});
