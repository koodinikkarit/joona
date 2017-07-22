import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


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
                            
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="/login">Kirjaudu</NavItem>
                        </Nav>
                    </Navbar>
                    {routes}
                </div>
            </Router>
        )
    }
}