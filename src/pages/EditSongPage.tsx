import * as React from "react";

import { match } from "react-router";

import { Grid, Row, Col, Panel, FormControl } from "react-bootstrap";
import { EditVariation } from "../songs";

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
					<Panel>
						<Panel.Heading>Tunnisteet</Panel.Heading>
						<Panel.Body>asd asd</Panel.Body>
					</Panel>
					<Panel>
						<Panel.Heading>Laulutietokannat</Panel.Heading>
						<Panel.Body>asd asd</Panel.Body>
					</Panel>
					<Panel>
						<Panel.Heading>Kirjailijat</Panel.Heading>
						<Panel.Body>
							<div>
								<FormControl
									type="text"
									placeholder="Hakusana"
								/>
							</div>

							<div>
								<input type="checkbox" /> k1
							</div>
							<div>
								<input type="checkbox" /> k1
							</div>
							<div>
								<input type="checkbox" /> k1
							</div>
							<div>
								<input type="checkbox" /> k1
							</div>
							<div>
								<input type="checkbox" /> k1
							</div>
							<div>
								<input type="checkbox" /> k1
							</div>
							<div>
								<input type="checkbox" /> k1
							</div>
							<div>
								<input type="checkbox" /> k1
							</div>
						</Panel.Body>
					</Panel>
				</Col>
			</Row>
		</Grid>
	);
};
