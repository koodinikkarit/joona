import express from "express";
import path from "path";
import webpack from "webpack";
import WebpackMiddleware from "webpack-dev-middleware";
import bodyParser from "body-parser";
import session from "express-session";

const moduleConfig = require(path.resolve(__dirname, "module-config"));

import serve from "./serve";

const app = express();

var entry = {
	app: path.resolve(__dirname, "js", "app.js")
};

var output = {
	filename: "[name].js",
	path: path.join(__dirname, "./public/") 
};

output.path = "/public/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
	session(
		{ 
			secret: "keyboard cat",
			resave: false,
			saveUninitialized: false,
			cookie: { 
				maxAge: 60000000,
				secure: false
			}
		}
	)
);
app.use("/static", express.static("public"));

app.use(WebpackMiddleware(webpack({
	devtool: "eval",
	entry: entry,
	module: moduleConfig,
	output: output
}), {
	contentBase: "../public/",
	publicPath: "/js/",
	stats: "errors-only"
}));

serve(app);
