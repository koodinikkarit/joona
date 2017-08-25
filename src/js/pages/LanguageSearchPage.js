import React from "react";
import {
	compose
} from "react-apollo";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import {
	Link
} from "react-router-dom";
  
import Button from "react-bootstrap/lib/Button";

import LanguageSearch from "../languages/LanguageSearch";

import {
	AppendBottomMedium
} from "../styles/Layout.css";

export class LanguageSearchPage extends React.Component {
	render() {
		return (
			<Row>
				<Col md={12}>
					<div className={AppendBottomMedium}>
						<Link to="/createlanguage">
							<Button>
								Lisää kieli
							</Button>
						</Link>
					</div>
					<LanguageSearch
						getItemLink={id => "/editlanguage/" + id} />
				</Col>
			</Row>
		);
	}
}

export default compose(

)(LanguageSearchPage);