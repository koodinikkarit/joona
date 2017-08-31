import React from "react";
import {
	compose
} from "react-apollo";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import EditLanguage from "../languages/EditLanguage";
import LanguageSearch from "../languages/LanguageSearch";

export class EditLanguagePage extends React.Component {
	render() {
		return (
			<Grid>
				<Row>
					<Col md={6}>
						<EditLanguage
							languageId={this.props.match.params.languageId}
							onSuccess={() => {
								this.props.history.push("/languages");
							}}
							onRemove={() => {
								this.props.history.push("/languages");
							}}
							getCancelLinkPath={() => {
								return "/languages";
							}} />
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

)(EditLanguagePage);