import React from "react";
import {
	compose
} from "react-apollo";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import SongSearch from "../songs/SongSearch";

export class TagSongsPage extends React.Component {
	render() {
		return (
			<Row>
				<Col md={12}>
					<SongSearch
						tagId={this.props.match.params.tagId}
						getSongItemLink={id => {
							return "/tag/" + this.props.match.params.tagId + "/editsong/" + id;
						}} />
				</Col>
			</Row>
		);
	}
}

export default compose(

)(TagSongsPage);