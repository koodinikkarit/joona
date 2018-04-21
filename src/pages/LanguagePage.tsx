import * as React from "react";

import { match } from "react-router";

import { Grid, Row, Col } from "react-bootstrap";
import { LanguageInfo, LanguageVariations } from "../languages";

type InputProps = {
	match: match<{
		languageId: string;
	}>;
};

export const LanguagePage = (inputProps: InputProps) => {
	return (
		<Grid>
			<Row>
				<Col sm={4}>
					<LanguageInfo
						languageId={inputProps.match.params.languageId}
					/>
				</Col>
				<Col sm={5}>
					<LanguageVariations
						languageId={inputProps.match.params.languageId}
					/>
				</Col>
			</Row>
		</Grid>
	);
};
