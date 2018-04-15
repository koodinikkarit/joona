import * as React from "react";

import {
	Navbar,
	Nav,
	NavItem,
	NavDropdown,
	MenuItem,
	Button
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { Link } from "react-router-dom";
import { graphql, ChildProps, compose, MutationResult } from "react-apollo";
import { PAGE_VIEWER_QUERY, USER_LOGOUT_MUTATION } from "./servergql";

import { getPageViewerQuery, logoutMutation } from "./types";

type InputProps = {};

interface IResponseProps extends getPageViewerQuery {}

interface INavigationBar extends ChildProps<InputProps, IResponseProps> {
	logout: () => Promise<MutationResult<logoutMutation>>;
}

const withViewer = graphql(PAGE_VIEWER_QUERY);
const withLogout = graphql(USER_LOGOUT_MUTATION, {
	name: "logout"
});

export const NavigationBar = compose(withViewer, withLogout)(
	(props: INavigationBar) => {
		// if (props.data.loading) {
		// 	return <div>lsfsyssn..</div>;
		// }

		// if (props.data.error) {
		// 	return <div>ddddfshhhb..</div>;
		// }

		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/">Joona </Link>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					<NavDropdown
						id="songdatabases-menu"
						eventKey={1}
						title="Tietokannat"
					>
						<LinkContainer to="/songdatabases">
							<MenuItem eventKey={1.1}>Laulutietokannat</MenuItem>
						</LinkContainer>
					</NavDropdown>
					<LinkContainer to="/songs">
						<NavItem eventKey={2}>Laulut</NavItem>
					</LinkContainer>
					<NavDropdown
						id="lisukkeet-menu"
						eventKey={3}
						title="Lisukkeet"
					>
						<LinkContainer to="/tags">
							<MenuItem eventKey={3.1}>Tunnisteet</MenuItem>
						</LinkContainer>
						<LinkContainer to="/languages">
							<MenuItem eventKey={3.2}>Kielet</MenuItem>
						</LinkContainer>
						<LinkContainer to="/authors">
							<MenuItem eventKey={3.3}>Kirjoittajat</MenuItem>
						</LinkContainer>
						<LinkContainer to="/copyrights">
							<MenuItem eventKey={3.4}>Tekijänoikeudet</MenuItem>
						</LinkContainer>
					</NavDropdown>
					<NavDropdown
						id="hallinta-menu"
						eventKey={5}
						title="Hallinta"
					>
						<LinkContainer to="/matiasclients">
							<MenuItem eventKey={5.1}>Matiakset</MenuItem>
						</LinkContainer>
					</NavDropdown>
				</Nav>
				{props.data.viewer &&
					props.data.viewer.user && (
						<Nav pullRight={true}>
							<NavItem
								style={{
									marginTop: "-7px",
									marginBottom: "-7px"
								}}
							>
								<Button
									onClick={() => {
										props.logout();
									}}
								>
									Kirjaudu ulos
								</Button>
							</NavItem>
						</Nav>
					)}
				<Nav pullRight={true}>
					{props.data.viewer &&
						props.data.viewer.user && (
							<NavItem eventKey={1}>
								{props.data.viewer.user.userName}
							</NavItem>
						)}
				</Nav>
			</Navbar>
		);
	}
);
