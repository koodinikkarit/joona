import React from 'react';
import ReactDOMServer from "react-dom/server";
import request from "request";
import PageFrame from "./js/PageFrame";

export default function ssr(app) {
	app.get("/login", (req, res) => {
		res.redirect(302, "http://localhost:7070?return_url=http://localhost:11111/create_session");
	});

    app.get("/create_session", (req, res) => {
        console.log("create_session", req.sessionID);
        console.log("token ", req.query.token);
        res.redirect(302, "http://localhost:11111");
    });

    app.use("/api", (req, res) => {
        request.post("http://localhost:9595/", { form: req.body}, (err, data) => {
            if (!data) {
                console.log("500 service unvaivable");
                res.writeHead(500);
            } else {
                res.end(data.body);
            }
        });
    });

    app.use((req, res) => {
		res.status(200);
        res.send(`<!doctype html>\n${ReactDOMServer.renderToString(<PageFrame />)}`);
        res.end();
    });
}