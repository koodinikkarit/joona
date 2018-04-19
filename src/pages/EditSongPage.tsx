import * as React from "react";

import { match } from "react-router";

import { Grid, Row, Col } from "react-bootstrap";
import {
	EditVariation,
	VariationAuthor,
	VariationSongDatabases
} from "../songs";
import { VariationTags } from "../tags";

type InputProps = {
	match: match<{
		variationId: string;
	}>;
};

export const EditSongPage = (inputProps: InputProps) => {
	return (
		<Grid>
			<Row>
				<Col sm={6}>
					<EditVariation
						variationId={inputProps.match.params.variationId}
					/>
				</Col>
				<Col sm={6}>
					<VariationTags
						variationId={inputProps.match.params.variationId}
					/>
					<VariationSongDatabases
						variationId={inputProps.match.params.variationId}
					/>
					<VariationAuthor
						variationId={inputProps.match.params.variationId}
					/>
				</Col>
			</Row>
		</Grid>
	);
};
