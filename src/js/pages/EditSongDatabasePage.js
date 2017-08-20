import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import {
	Link
} from "react-router-dom";

import {
	RectBox,
	BoxInnerMedium,
	AppendBottomMedium,
	AppendBottomBig,
	AppendBottomSmall,
	AppendRight
} from "../styles/Layout.css";

import Button from "react-bootstrap/lib/Button";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import SongSearch from "../songs/SongSearch";
import EditSongDatabase from "../databases/EditSongDatabase";
import SongDatabaseSearch from "../databases/SongDatabaseSearch";

import ADD_VARIATION_TO_SONG_DATABASE_MUTATION from "./add_variation_to_song_database_mutation.graphql";

export class EditSongDatabasePage extends React.Component {
	render() {
		var songDatabaseId = this.props.match.params.songDatabaseId;
		if (this.props.history.location.pathname.toLowerCase().endsWith("addsong")) {
			return (
				<Row>
					<Col md={4}>
						<EditSongDatabase
							songDatabaseId={songDatabaseId}
							history={this.props.history} />
					</Col>
					<Col md={4}>
						<label>
							Lisää laulu kantaan
						</label>
						<div className={AppendBottomMedium}>
							<SongSearch
								songDatabaseFilterId={songDatabaseId}
								songItemClick={id => {
									this.props.addVariationToSongDatabase(songDatabaseId, id);
								}} />
						</div>
						<Link to="./">
							<Button className={AppendBottomBig}>
								Lopeta
							</Button>
						</Link>
					</Col>
					<Col md={4}>
						<SongDatabaseSearch />
					</Col>
				</Row>
			);
		} else {
			return (
				<Row>
					<Col md={6}>
						<EditSongDatabase
							songDatabaseId={this.props.match.params.songDatabaseId}
							history={this.props.history}
							addNewSongsEnabled={true} />
					</Col>
					<Col md={6}>
						<SongDatabaseSearch />
					</Col>
				</Row>
			);
		}
	}
}

export default compose(
	graphql(ADD_VARIATION_TO_SONG_DATABASE_MUTATION, {
		props: ({ mutate }) => ({
			addVariationToSongDatabase: (songDatabaseId, variationId) => mutate({
				variables: {
					songDatabaseId,
					variationId
				},
				update: (store, { data }) => {
					console.log("update", store, data);
				},
				updateQueries: {
					songDatabase: (prev, { mutationResult }) => {
						if (!prev.songDatabase.variations.some(p => p.id === mutationResult.data.songDatabaseVariation.variation.id)) {
							return {
								...prev,
								songDatabase: {
									...prev.songDatabase,
									variations: [
										...prev.songDatabase.variations,
										mutationResult.data.songDatabaseVariation.variation
									]
								}
							};
						}
					},
					searchVariations: (prev, { mutationResult }) => {
						console.log("prev", prev, mutationResult);
						return {
							...prev,
							variationsConnection: {
								...prev.variationsConnection,
								variations: prev.variationsConnection.variations.filter(p => p.id !== mutationResult.data.songDatabaseVariation.variation.id)
							}
						};
					}
				}
			})
		})
	})
)(EditSongDatabasePage);