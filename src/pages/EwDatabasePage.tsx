import * as React from "react";

import { match } from "react-router";

import { Grid, Row, Col } from "react-bootstrap";
import { EwDatabaseInfo } from "../ewdatabases";

type InputProps = {
	match: match<{
		ewDatabaseId: string;
	}>;
};

export const EwDatabasePage = (inputProps: InputProps) => {
	return (
		<Grid>
			<Row>
				<Col sm={6}>
					<EwDatabaseInfo
						ewDatabaseId={inputProps.match.params.ewDatabaseId}
					/>
				</Col>
			</Row>
		</Grid>
	);
};
