import * as React from "react";
import { Grid, Col, Row } from "react-bootstrap";
import { SongDatabasesResults } from "../songdatabases";

export const SongDatabasesPage = () => {
	return (
		<Grid>
			<Row>
				<Col sm={9}>
					<SongDatabasesResults />
				</Col>
			</Row>
		</Grid>
	);
};
