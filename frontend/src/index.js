import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "./layout/HorizontalListPanel.css";
//import "bootstrap/dist/css/bootstrap-theme.css";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { ApolloProvider } from "react-apollo";

import client from "./client";

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);
registerServiceWorker();
