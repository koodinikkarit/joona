import * as React from "react";

import { match } from "react-router";

import { Grid, Row, Col } from "react-bootstrap";
import { AuthorInfo, AuthorVariations } from "../authors";

type InputProps = {
	match: match<{
		authorId: string;
	}>;
};

export const AuthorPage = (inputProps: InputProps) => {
	return (
		<Grid>
			<Row>
				<Col sm={4}>
					<AuthorInfo authorId={inputProps.match.params.authorId} />
				</Col>
				<Col sm={5}>
					<AuthorVariations
						authorId={inputProps.match.params.authorId}
					/>
				</Col>
			</Row>
		</Grid>
	);
};
