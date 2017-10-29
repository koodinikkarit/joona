import React from "react";
import {
	compose
} from "react-apollo";
import QueryString from "query-string";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import SongSearch from "../songs/SongSearch";

export class SongSearchPage extends React.Component {
	changeSearchWord(searchWord) {
		var words = searchWord.split(" ");
		this.props.history.push({
			pathName: this.props.location,
			search: searchWord ? "?q=" + words.join("+") : ""
		});
	}

	render() {
		var query = QueryString.parse(this.props.location.search);
		return (
			<Row>
				<Col md={12}>
					<SongSearch
						searchWord={query.q ? query.q.replace("+", " ") : ""}
						history={this.props.history}
						addSongButtonEnabled={true}
						getSongItemLink={(id) => {
							return "/editsong/" + id + (query.q ? "?q=" + query.q.split(" ").join("+") : "");
						}}
						onSearchWordChanged={this.changeSearchWord.bind(this)} />
				</Col>
			</Row>
		);
	}
}

export default compose(

)(SongSearchPage);