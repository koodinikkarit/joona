import React from "react";
import {
	compose
} from "react-apollo";
//import QueryString from "query-string";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import TagSearch from "../tags/TagSearch";
import CreateTag from "../tags/CreateTag";

export class CreateTagPage extends React.Component {
	render() {
		return(
			<Grid>
				<Row>
					<Col md={6}>
						<CreateTag />
					</Col>
					<Col md={6}>
						<TagSearch 
							getItemLink={id => "/edittag/" + id} />
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default compose(

)(CreateTagPage);