import React from "react";

import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import NavDropdown from "react-bootstrap/lib/NavDropdown";
import MenuItem from "react-bootstrap/lib/MenuItem";

export default class extends React.Component {
	render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/">Joona</Link>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					<NavDropdown eventKey={1} title="Tietokannat">
						<MenuItem eventKey={1.1}>
							<Link to="/songdatabases">Laulutietokannat</Link>
						</MenuItem>
					</NavDropdown>
					<NavItem eventKey={2}>
						<Link to="/songs">Laulut</Link>
					</NavItem>
					<NavDropdown eventKey={3} title="Lisukkeet">
						<MenuItem eventKey={3.1}>
							<Link to="/tags">Tunnisteet</Link>
						</MenuItem>
						<MenuItem eventKey={3.2}>
							<Link to="/languages">Kielet</Link>
						</MenuItem>
						<MenuItem eventKey={3.3}>
							<Link to="/authors">Kirjoittajat</Link>
						</MenuItem>
						<MenuItem eventKey={3.4}>
							<Link to="/copyrights">Tekijänoikeudet</Link>
						</MenuItem>
					</NavDropdown>
					<NavDropdown eventKey={5} title="Hallinta">
						<MenuItem eventKey={5.1}>
							<Link to="/mm">Matiakset</Link>
						</MenuItem>
					</NavDropdown>
				</Nav>
			</Navbar>
		);
	}
}
