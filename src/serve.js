import React from 'react';
import ReactDOMServer from "react-dom/server";
import request from "request";
import PageFrame from "./js/PageFrame";
import read from "read-yaml";
import fs from "fs";

var config = {
	port: 22222
};

if (fs.existsSync("config.yml")) {
	config = read.sync("config.yml");
}


export default (app) => {
	app.get("/login", (req, res) => {
		res.redirect(302, "http://localhost:7070?return_url=http://localhost:11111/create_session");
	});

    app.get("/create_session", (req, res) => {
        console.log("create_session", req.sessionID);
        console.log("token ", req.query.token);
        res.redirect(302, "http://localhost:11111");
    });

	if (config.petriIp && config.petriPort) {
		app.use("/api", (req, res) => {
			request.post(`http://${config.petriIp}:${config.petriPort}/`, { form: req.body }, (err, data) => {
				if (!data) {
					console.log("500 service unvaivable");
					res.writeHead(500);
				} else {
					res.end(data.body);
				}
			});
		});
	} else {
		app.use("/api", (req, res) => {
			res.writeHead(500);
		});
	}

    app.use((req, res) => {
		res.status(200);
        res.send(`<!doctype html>\n${ReactDOMServer.renderToString(<PageFrame />)}`);
        res.end();
	});
	
	app.listen(config.port, () => {
    	console.log("serveri on käynnissä");
	});
}