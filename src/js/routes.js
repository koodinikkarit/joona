import React from "react";
import {
	Route
} from 'react-router-dom'

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

export default (
	<div>
		<Grid>
			<Route path="/songdatabases" component={() => (
				<Row>
					<Col md={6}>
						asd
					</Col>
					<Col md={6}>
					qweqwe
					</Col>
				</Row>
			)} />
		</Grid>
	</div>
)