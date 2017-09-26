import React from "react";
import {
	compose
} from "react-apollo";


import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import EditSong from "../songs/EditSong";
import SongSearch from "../songs/SongSearch";

export class LanguageEditSongPage extends React.Component {
	render() {
		const {
			variationId,
			languageId
		} = this.props.match.params;
		return (
			<Row>
				<Col md={6}>
					<EditSong
						variationId={variationId}
						onSuccess={() => {
							this.props.history.push(`/language/${languageId}/songs`);
						}}
						onRemove={() => {
							this.props.history.push(`/language/${languageId}/songs`);
						}}
						getCancelLinkPath={() => {
							return `/language/${languageId}/songs`;
						}} />
				</Col>
				<Col md={6}>
					<SongSearch
						languageId={languageId}
						getSongItemLink={id => {
							return `/language/${languageId}/editsong/${id}`;
						}} />
				</Col>
			</Row>
		);
	}
}

export default compose(

)(LanguageEditSongPage);