import "core-js/es6/map";
import "core-js/es6/set";
import "es6-string-polyfills";
import "es6-weak-map/implement";

import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider } from "react-apollo";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "./layout/HorizontalListPanel.css";

import { createPetriClient } from "petri-client";

const developmentEnvironment =
	process && process.env && process.env.NODE_ENV === "development";

const graphqlHost = developmentEnvironment
	? process.env.REACT_APP_GRAPHQL_HOST
	: window.location.host;

const graphqlPort = developmentEnvironment
	? parseInt(process.env.REACT_APP_GRAPHQL_PORT as string, 10)
	: parseInt(window.location.port, 10);

const graphqlSubscriptionsHost = developmentEnvironment
	? process.env.REACT_APP_GRAPHQL_HOST
	: window.location.host;

const graphqlSubscriptionsPort = developmentEnvironment
	? parseInt(process.env.REACT_APP_GRAPHQL_PORT as string, 10)
	: parseInt(window.location.port, 10);

const client = createPetriClient({
	graphqlHost,
	graphqlPort,
	graphqlSubscriptionsHost,
	graphqlSubscriptionsPort
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root") as HTMLElement
);
registerServiceWorker();
