import React from "react";
// import {
// 	match,
// 	RouterContext
// } from "react-router-dom";

// import { 
// 	ApolloClient, 
// 	createNetworkInterface, 
// 	ApolloProvider ,
// 	renderToStringWithData
// } from "react-apollo";

import ReactDOMServer from "react-dom/server";
import request from "request";
import PageFrame from "./js/PageFrame";

//import Routes from "./js/routes";

export default (app) => {
	app.post("/login", (req, res) => {
		if (!req.session.logincount) {
			req.session.logincount = 1;
		} else {
			req.session.logincount++;
		}
		request.post("http://${process.env.JOONA_PETRI_IP}:${process.env.JOONA_PETRI_PORT}/login", {
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
		// match({
		// 	routes: <Routes />,
		// 	location: req.originalUrl
		// }, (error, redirectLocation, renderProps) => {
		// 	const client = new ApolloClient({
		// 		ssrMode: true,
		// 		networkInterface: createNetworkInterface({
		// 			uri: `http://${process.env.JOONA_PETRI_IP}:${process.env.JOONA_PETRI_PORT}/`
		// 		}),
		// 		opts: {
		// 			credentials: "same-origin"
		// 		}
		// 	});
		// 	const app = (
		// 		<ApolloProvider>
		// 			<RouterContext {...renderProps} />
		// 		</ApolloProvider>
		// 	);

		// 	renderToStringWithData(app).then((content) => {
		// 		res.status(200);
		// 		res.send(`<!doctype html>\n${ReactDOMServer.renderToString(<PageFrame content={content} />)}`);
		// 		res.end();
		// 	});
		// });

		res.status(200);
		res.send(`<!doctype html>\n${ReactDOMServer.renderToString(<PageFrame />)}`);
		res.end();
	});
	
	app.listen(process.env.JOONA_PORT || 22222, () => {
    	console.log("serveri on käynnissä");
	});
};