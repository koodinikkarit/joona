import React from "react";
import {
	compose
} from "react-apollo";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import CreateLanguage from "../languages/CreateLanguage";
import LanguageSearch from "../languages/LanguageSearch";

export class CreateLanguagePage extends React.Component {
	render() {
		return (
			<Grid>
				<Row>
					<Col md={6}>
						<CreateLanguage />
					</Col>
					<Col md={6}>
						<LanguageSearch
							getItemLink={id => "/editlanguage/" + id} />
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default compose(

)(CreateLanguagePage);