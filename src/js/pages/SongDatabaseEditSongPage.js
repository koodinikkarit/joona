import React from "react";
import {
	compose
} from "react-apollo";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import EditSong from "../songs/EditSong";
import SongSearch from "../songs/SongSearch";

export class SongDatabaseEditSongPage extends React.Component {
	render() {
		const {
			variationId,
			songDatabaseId
		} = this.props.match.params;
		return (
			<Row>
				<Col md={6}>
					<EditSong
						variationId={variationId}
						onSuccess={() => {
							this.props.hisory.push(`/songdatabase/${songDatabaseId}/songs`);
						}}
						onRemove={() => {
							this.props.hisory.push(`/songdatabase/${songDatabaseId}/songs`);
						}}
						getCancelLinkPath={() => {
							return `/songdatabase/${songDatabaseId}/songs`;
						}} />
				</Col>
				<Col md={6}>
					<SongSearch
						songDatabaseId={songDatabaseId}
						getSongItemLink={id => {
							return `/songdatabase/${songDatabaseId}/editsong/${id}`;
						}} />
				</Col>
			</Row>
		)
	}
}

export default compose(

)(SongDatabaseEditSongPage);