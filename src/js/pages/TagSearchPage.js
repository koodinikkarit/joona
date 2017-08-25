import React from "react";
import {
	compose
} from "react-apollo";
import QueryString from "query-string";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import {
	Link
} from "react-router-dom";
  
import Button from "react-bootstrap/lib/Button";

import TagSearch from "../tags/TagSearch";

import {
	AppendBottomMedium
} from "../styles/Layout.css";

export class TagSearchPage extends React.Component{

	render() {
		return (
			<Row>
				<Col md={12}>
					<div className={AppendBottomMedium}>
						<Link to="/createtag">
							<Button>
								Luo tunniste
							</Button>
						</Link>
					</div>
					<TagSearch
						getItemLink={id => "/edittag/" + id} />
				</Col>
			</Row>
		);
	}
}

export default compose(

)(TagSearchPage);