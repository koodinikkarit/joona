import * as React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { TagInfo } from "../tags/TagInfo";
import { TagVariations } from "../tags";

export const TagPage = () => {
	return (
		<Grid>
			<Row>
				<Col sm={4}>
					<TagInfo />
				</Col>
				<Col sm={8}>
					<TagVariations />
				</Col>
			</Row>
		</Grid>
	);
};
