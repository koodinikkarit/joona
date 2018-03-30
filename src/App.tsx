import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { NavigationBar } from "./NavigationBar";
import { Routes } from "./Routes";

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<NavigationBar />
					<Routes />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
