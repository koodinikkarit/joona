import React from "react";
import {
	compose
} from "react-apollo";
import QueryString from "query-string";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import SongSearch from "../songs/SongSearch";
import CreateSong from "../songs/CreateSong";

export class CreateSongPage extends React.Component {
	changeSearchWord(searchWord) {
		this.props.history.push({
			pathName: this.props.location,
			search: (searchWord ? "?q=" + searchWord : "")
		});
	}

	render() {
		var query = QueryString.parse(this.props.location.search);
		return (
			<Row>
				<Col md={6}>
					<CreateSong 
						history={this.props.history}
						onSuccess={() => {
							this.props.history.push("/songs/" + (query.q ? "?q=" + query.q : ""));
						}}
						getCancelLinkPath={() => {
							return "/songs/" + (query.q ? "?q=" + query.q : "");
						}} />
				</Col>
				<Col md={6}>
					<SongSearch
						searchWord={query.q}
						history={this.props.history}
						addSongButtonEnabled={true}
						getSongItemLink={(id) => {
							return "/editsong/" + (query.q ? "?q=" + query.q : "");
						}}
						onSearchWordChanged={this.changeSearchWord.bind(this)} />
				</Col>
			</Row>
		);
	}
}

export default compose(

)(CreateSongPage);