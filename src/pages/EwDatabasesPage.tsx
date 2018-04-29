import * as React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { EwDatabasesList } from "../ewdatabases";

export const EwDatabasesPage = () => {
	return (
		<Grid>
			<Row>
				<Col lg={8}>
					{/* <AppendBottom>
						<CreateEwDatabase />
					</AppendBottom> */}
					<EwDatabasesList />
				</Col>
			</Row>
		</Grid>
	);
};
