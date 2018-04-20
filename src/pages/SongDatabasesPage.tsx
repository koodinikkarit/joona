import * as React from "react";
import { Grid, Col, Row } from "react-bootstrap";
import { SongDatabasesResults, CreateSongDatabase } from "../songdatabases";
import { AppendBottom } from "../layout";

export const SongDatabasesPage = () => {
	return (
		<Grid>
			<AppendBottom>
				<Row>
					<Col sm={6}>
						<CreateSongDatabase />
					</Col>
				</Row>
			</AppendBottom>
			<Row>
				<Col sm={9}>
					<SongDatabasesResults />
				</Col>
			</Row>
		</Grid>
	);
};
