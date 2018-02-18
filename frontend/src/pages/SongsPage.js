import React from "react";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import QueryString from "query-string";

import Editvariation from "../songs/EditVariation";
import SongSearchSettings from "../songs/SongSearchSettings";
import SongSearchResults from "../songs/SongSearchResults";

export default class SongsPage extends React.Component {
	constructor(props) {
		super(props);
		this.onSearchwordChanged.bind(this);
		this.onSongSelect.bind(this);
		this.onSongUnSelect.bind(this);
		this.pushNewQuery.bind(this);
		this.getOldQuery.bind(this);
	}

	onClick() {
		var query = {
			nimi: "seppo",
			songs: [1, 2]
		};
		const q = QueryString.stringify(query, {
			arrayFormat: "bracket"
		});
		this.props.history.push("/songs?" + q);
	}

	onSearchwordChanged(value) {
		console.log("new searchword", this);
		let query = this.getOldQuery();
		query.searchword = value;
		this.pushNewQuery(query);
	}

	onSongSelect(id) {
		let query = this.getOldQuery();
		if (!query.songs) query.songs = [];
		query.songs.push(id);
		this.pushNewQuery(query);
	}

	onSongUnSelect(id) {
		console.log("Unselect ", id);
		let query = this.getOldQuery();
		if (query.songs) {
			query.songs = query.songs.filter(p => p !== id);
			this.pushNewQuery(query);
		}
	}

	pushNewQuery(q) {
		const queryString = QueryString.stringify(q, {
			arrayFormat: "bracket"
		});
		this.props.history.push("/songs?" + queryString);
	}

	getOldQuery() {
		return QueryString.parse(this.props.location.search, {
			arrayFormat: "bracket"
		});
	}

	render() {
		const query = QueryString.parse(this.props.location.search, {
			arrayFormat: "bracket"
		});

		const songs = query.songs || [];

		console.log("query", query);

		return (
			<Row>
				<Col md={12}>
					<Row>
						<Col md={12}>
							<div>
								{songs.map((p, i) => (
									<div
										key={p}
										className="HorizontalListPanel"
									>
										<Editvariation
											variationId={p}
											onCancel={() => {
												this.onSongUnSelect(p);
											}}
										/>
									</div>
								))}
							</div>
						</Col>
					</Row>
					<Row>
						<Col md={3}>
							<SongSearchSettings
								searchWord={query.searchword}
								onSearchwordChanged={this.onSearchwordChanged.bind(
									this
								)}
							/>
						</Col>
						<Col md={9}>
							<SongSearchResults
								selectedSongs={songs}
								searchWord={query.searchword}
								onSelect={this.onSongSelect.bind(this)}
								onUnSelect={this.onSongUnSelect.bind(this)}
								onClearSelection={() => {
									let query = this.getOldQuery();
									query.songs = [];
									this.pushNewQuery(query);
								}}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}
