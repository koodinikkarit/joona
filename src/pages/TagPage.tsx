import * as React from "react";

import { match } from "react-router";

import { Grid, Row, Col } from "react-bootstrap";
import { TagInfo } from "../tags/TagInfo";
import { TagVariations } from "../tags";

type InputProps = {
	match: match<{
		tagId: string;
	}>;
};

export const TagPage = (inputProps: InputProps) => {
	return (
		<Grid>
			<Row>
				<Col sm={4}>
					<TagInfo tagId={inputProps.match.params.tagId} />
				</Col>
				<Col sm={5}>
					<TagVariations tagId={inputProps.match.params.tagId} />
				</Col>
			</Row>
		</Grid>
	);
};
