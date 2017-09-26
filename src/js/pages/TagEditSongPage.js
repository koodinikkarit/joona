import React from "react";
import {
	compose
} from "react-apollo";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import EditSong from "../songs/EditSong";
import SongSearch from "../songs/SongSearch";

export class TagEditsongPage extends React.Component {
	render() {
		return (
			<Row>
				<Col md={6}>
					<EditSong
						variationId={this.props.match.params.variationId}
						getCancelLinkPath={() => {
							return "/tag/" + this.props.match.params.tagId + "/songs/";
						}}
						onSuccess={() => {
							this.props.history.push("/tag/" + this.props.match.params.tagId + "/songs/");
						}}
						onRemove={() => {
							this.props.history.push("/tag/" + this.props.match.params.tagId + "/songs/");
						}} />
				</Col>
				<Col md={6}>
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

)(TagEditsongPage);