import ReactDOM from 'react-dom';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from "./client";

import Main from "./Main";

ReactDOM.render(
	<ApolloProvider client={client}>
		<Main />
	</ApolloProvider>,
	document.getElementById("root")
)