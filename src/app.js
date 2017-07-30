import express from "express";
import path from "path";
import webpack from "webpack";
import WebpackMiddleware from "webpack-dev-middleware";
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOMServer from "react-dom/server";
import request from "request";
import PageFrame from "./js/PageFrame";

import serve from "./serve";

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static('public'));

app.use("/js/app.js", (req, res) => {
	res.sendFile(path.join(process.cwd(), "app.js"));
});

serve(app);