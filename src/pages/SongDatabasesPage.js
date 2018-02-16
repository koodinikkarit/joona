import React, { Component } from "react";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Grid from "react-bootstrap/lib/Grid";

import SongDatabasesSearch from "../songdatabases/SongDatabasesSearch";

export default class TagsPage extends Component {
	render() {
		return (
			<div>
				<Grid>
					<SongDatabasesSearch />
				</Grid>
			</div>
		);
	}
}
