import React from "react";
import {
	compose
} from "react-apollo";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import EditTag from "../tags/EditTag";
import TagSearch from "../tags/TagSearch";

export class EditTagPage extends React.Component {
	render() {
		return (
			<Grid>
				<Row>
					<Col md={6}>
						<EditTag
							tagId={this.props.match.params.id}
							onSuccess={() => {
								this.props.history.push("/tags");
							}}
							onRemove={() => {
								this.props.history.push("/tags");
							}}
							getCancelLinkPath={() => {
								return "/tags";
							}} />
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

)(EditTagPage);