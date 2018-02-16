import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider } from "react-apollo";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "./layout/HorizontalListPanel.css";

// class MyInput extends React.Component {
// 	render() {
// 		return <input {...this.props} />;
// 	}
// }

// import { DebounceCallback } from "./forms/DebounceCallback";
import { client } from "./client";

// const C = DebounceCallback(MyInput, () => {
// 	console.log("onChange");
// });

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	// <div>
	// 	<C
	// 		onChange={() => {
	// 			console.log("onChangee");
	// 		}}
	// 	/>
	// </div>
	document.getElementById("root") as HTMLElement
);
registerServiceWorker();
