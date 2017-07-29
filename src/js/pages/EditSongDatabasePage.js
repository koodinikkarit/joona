import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import EditSongDatabase from "../databases/EditSongDatabase";
import SongDatabaseSearch from "../databases/SongDatabaseSearch";

export class EditSongDatabasePage extends React.Component {
	render() {
		return (
			<Row>
				<Col md={6}>
					<EditSongDatabase />
				</Col>
				<Col md={6}>
					<SongDatabaseSearch />
				</Col>
			</Row>
		)
	}
}

export default compose(

)(EditSongDatabasePage);