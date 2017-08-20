import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import CreateEwDatabase from "../databases/CreateEwDatabase";
import EwDatabaseSearch from "../databases/EwDatabaseSearch";

export class CreateEwDatabasePage extends React.Component {
	render() {
		return (
			<Row>
				<Col md={6}>
					<CreateEwDatabase history={this.props.history} />
				</Col>
				<Col md={6}>
					<EwDatabaseSearch />
				</Col>
			</Row>	
		);
	}
}

export default compose(

)(CreateEwDatabasePage);