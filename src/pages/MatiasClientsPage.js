import React, { Component } from "react";

import { Grid } from "react-bootstrap";

import SearchMatiasClients from "../matiasclients/SearchMatiasClients";

export default class MatiasClientsPage extends Component {
	render() {
		return (
			<div>
				<Grid>
					<SearchMatiasClients />
				</Grid>
			</div>
		);
	}
}
