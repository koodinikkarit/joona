import React from "react";
import ReactDOMServer from "react-dom/server";
import request from "request";
import PageFrame from "./js/PageFrame";

export default (app) => {
	app.post("/login", (req, res) => {
		if (!req.session.logincount) {
			req.session.logincount = 1;
		} else {
			req.session.logincount++;
		}
		request.post("http://localhost:9595/login", {
			form: req.body
		}, (err, data) => {
			if (!err) {
				req.session.token = JSON.parse(data.body).token;
				req.session.save();
			}
		});
		res.redirect(302, "/");
	});

	if (process.env.JOONA_PETRI_IP && process.env.JOONA_PETRI_PORT) {
		app.use("/api", (req, res) => {
			request.post(
				`http://${process.env.JOONA_PETRI_IP}:${process.env.JOONA_PETRI_PORT}/`,
				{
					headers: {
						"token": req.session.token
					},
					form: req.body 
				}, 
				(err, data) => {
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
	
	app.listen(process.env.JOONA_PORT || 22222, () => {
    	console.log("serveri on käynnissä");
	});
};