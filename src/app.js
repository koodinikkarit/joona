import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";

import Variations from "./Variations";

import NavigationBar from "./navigationbar";
import Routes from "./routes";

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<NavigationBar />
					<Routes />
				</div>
			</Router>
		);
	}
}

export default App;
