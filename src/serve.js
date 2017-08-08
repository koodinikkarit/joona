import React from 'react';
import ReactDOMServer from "react-dom/server";
import request from "request";
import PageFrame from "./js/PageFrame";


export default (app) => {
	app.get("/login", (req, res) => {
		res.redirect(302, "http://localhost:7070?return_url=http://localhost:11111/create_session");
	});

    app.get("/create_session", (req, res) => {
        console.log("create_session", req.sessionID);
        console.log("token ", req.query.token);
        res.redirect(302, "http://localhost:11111");
    });

	if (process.env.JOONA_PETRI_IP && process.env.JOONA_PETRI_PORT) {
		app.use("/api", (req, res) => {
			request.post(`http://${process.env.JOONA_PETRI_IP}:${process.env.JOONA_PETRI_PORT}/`, { form: req.body }, (err, data) => {
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
}