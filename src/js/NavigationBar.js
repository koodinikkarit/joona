import React from "react";
import {
	compose,
	graphql
} from "react-apollo";

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

import FETCH_USER from "./fetch_user.graphql";

export class NavigationBar extends React.Component {
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
							<Link to="/songdatabases">
								Laulutietokannat
							</Link>
						</MenuItem>
						{/* <MenuItem eventKey={1.2}>
							<Link to="/ewdatabases">
								Ewtietokannat
							</Link>
						</MenuItem> */}
						{/* <MenuItem eventKey={1.2}>
							<Link to="/databaselinks">
								Linkki ulkoiseen tietokantaan
							</Link>
						</MenuItem> */}
					</NavDropdown>
					<NavItem eventKey={2}>
						<Link to="/songs">
							Laulut
						</Link>
					</NavItem>
					<NavDropdown eventKey={3} title="Lisukkeet">
						<MenuItem eventKey={3.1}>
							<Link to="/tags">
								Tunnisteet
							</Link>
						</MenuItem>
						<MenuItem eventKey={3.2}>
							<Link to="/languages">
								Kielet
							</Link>
						</MenuItem>
						{/* <MenuItem eventKey={3.3}>
							<Link to="/authors">
								Kirjailijat
							</Link>
						</MenuItem>
						<MenuItem eventKey={3.4}>
							<Link to="/copyrights">
								Tekijänoikeudet
							</Link>
						</MenuItem> */}
					</NavDropdown>
					{/* <NavDropdown eventKey={4} title="Tapahtumat">
						<MenuItem eventKey={4.1}>
							<Link to="/events">
								Tapahtumat
							</Link>
						</MenuItem>
						<MenuItem eventKey={4.2}>
							<Link to="/schedules">
								Aikataulut
							</Link>
						</MenuItem>
					</NavDropdown> */}
					<NavDropdown eventKey={5} title="Hallinta">
						{/* <MenuItem eventKey={5.1}>
							<Link to="/logs">
								Lokit
							</Link>
						</MenuItem>
						<MenuItem eventKey={5.2}>
							<Link to="/history">
								Historia
							</Link>
						</MenuItem> */}
						<MenuItem eventKey={5.1}>
							<Link to="/mm">
								Matiakset
							</Link>
						</MenuItem>
					</NavDropdown>
				</Nav>
				<Nav pullRight>
					<NavItem eventKey={1}>
						{!this.props.loading &&
						this.props.user ? 
							<div>
								Terve
								{" " +this.props.user.userName}
							</div>
							:
							<Link to="/login">
								Kirjaudu
							</Link>}
					</NavItem>
				</Nav>
			</Navbar>
		);
	}
}

export default compose(
	// graphql(
	// 	FETCH_USER,
	// 	{
	// 		option: () => {
	// 			return {

	// 			};
	// 		},
	// 		props: ({
	// 			data: {
	// 				loading,
	// 				user
	// 			}
	// 		}) => ({
	// 			loading,
	// 			user
	// 		})
	// 	}
	// )
)(NavigationBar);