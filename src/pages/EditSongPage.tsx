import * as React from "react";

import { match } from "react-router";

import { Grid, Row, Col, Panel } from "react-bootstrap";
import { EditVariation, VariationAuthor } from "../songs";
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
					<Panel>
						<Panel.Heading>Laulutietokannat</Panel.Heading>
						<Panel.Body>asd asd</Panel.Body>
					</Panel>
					<VariationAuthor
						variationId={inputProps.match.params.variationId}
					/>
				</Col>
			</Row>
		</Grid>
	);
};
