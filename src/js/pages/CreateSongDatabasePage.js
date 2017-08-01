import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import CreateSongDatabase from "../databases/CreateSongDatabase";
import SongDatabaseSearch from "../databases/SongDatabaseSearch"

export class CreateSongDatabasePage extends React.Component {
	render() {
		return (
			<Row>
				<Col md={6}>
					<CreateSongDatabase history={this.props.history} />
				</Col>
				<Col md={6}>
					<SongDatabaseSearch history={this.props.history} />
				</Col>
			</Row>			
		)
	}
}

export default compose(

)(CreateSongDatabasePage);