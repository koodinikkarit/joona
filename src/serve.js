import React from "react";
import ReactDOMServer from "react-dom/server";
import PageFrame from "./js/PageFrame";

export default (app) => {

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