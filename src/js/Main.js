import React from "react";

import {
	BrowserRouter as Router,
	Route,
	Link
} from "react-router-dom";


import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import NavDropdown from "react-bootstrap/lib/NavDropdown";
import MenuItem from "react-bootstrap/lib/MenuItem";
import Grid from "react-bootstrap/lib/Grid";

import routes from "./routes";

export default class Main extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<div>
					<Navbar>
						<Navbar.Header>
							<Navbar.Brand>
								<Link to="/">Joona</Link>
							</Navbar.Brand>
						</Navbar.Header>
						<Nav>
							<NavDropdown eventKey={1} title="Tietokannat">
								<MenuItem eventKey={1.1}>
									<Link to="/songdatabases">
                                        Laulutietokannat
									</Link>
								</MenuItem>
								<MenuItem eventKey={1.2}>
									<Link to="/ewdatabases">
                                        Ewtietokannat
									</Link>
								</MenuItem>
							</NavDropdown>
							<NavItem eventKey={2}>
								<Link to="/songs">
                                    Laulut
								</Link>
							</NavItem>
							<NavItem eventKey={3}>
								<Link to="/tags">
									Tunnisteet
								</Link>
							</NavItem>
							<NavItem eventKey={4}>
								<Link to="/languages">
									Kielet
								</Link>
							</NavItem>
						</Nav>
						<Nav pullRight>
							<NavItem eventKey={1}>
								<Link to="/login">
									Kirjaudu
								</Link>
							</NavItem>
						</Nav>
					</Navbar>
					{routes}
				</div>
			</Router>
		);
	}
}