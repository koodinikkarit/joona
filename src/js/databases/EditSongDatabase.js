import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import {
	Link
} from "react-router-dom";

import Button from "react-bootstrap/lib/Button";

import {
	RectBox,
	BoxInnerMedium,
	AppendBottomMedium,
	AppendBottomBig,
	AppendBottomSmall,
	AppendRight
} from "../styles/Layout.css";

import {
	List
} from "../styles/List.css";

import {
	textInput
} from "../styles/Form.css";

import FETCH_SONG_DATABASE from "./fetch_song_database_query.graphql";
import EDIT_SONG_DATABASE from "./edit_song_database_mutation.graphql";
import REMOVE_SONG_DATABASE from "./remove_song_database.graphql";
import REMOVE_VARIATION_FROM_SONG_DATABASE from "./remove_variation_from_song_database.graphql";
import FETCH_VARIATION_QUERY from "../songs/fetch_variation_query.graphql";

export class EditSongDatabase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ""
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.songDatabase) {
			this.setState({
				name: nextProps.songDatabase.name
			});
		}
	}

	render() {
		if (!this.props.loading) {
			return (
				<div className={RectBox + " " + BoxInnerMedium + " " + AppendBottomBig}>
					<div className={AppendBottomMedium}>
						<div className={AppendBottomMedium}>
							<label>
								Nimi
							</label>
							<div>
								<input type="text" className={textInput} placeholder="Nimi"
									value={this.state.name}
									onChange={e => {
										this.setState({
											name: e.target.value
										});
									}} />
							</div>
						</div>
						<div className={AppendBottomBig}>
							<label>
								Laulut
							</label>
							<ul className={List + " " + RectBox + " " + BoxInnerMedium}
								style={{
									maxHeight: "500px",
									overflow: "auto"
								}}>
								{this.props.songDatabase.variations.map(p => (
									<li key={p.id} className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}>
										<div className={AppendRight}>
											{p.name}
										</div>
										<Button bsStyle="danger"
											onClick={e => {
												this.props.removeVariationFromSongDatabase(this.props.songDatabase.id, p.id);
											}}>
											Poista laulu
										</Button>
									</li>
								))}
							</ul>
							{this.props.addNewSongsEnabled &&
							<Link to={`/editsongdatabase/${this.props.songDatabase.id}/addsong`}>
								<Button>
									Lisää laulut
								</Button>
							</Link>}
						</div>
					</div>
					<Link to="/songdatabases">
						<Button className={AppendRight}>
							Peruuta
						</Button>
					</Link>
					<Button bsStyle="danger" className={AppendRight}
						onClick={e => {
							this.props.removeSongDatabase(this.props.songDatabase.id).then(data => {
								this.props.history.push("/songdatabases");
							});
						}}>
						Poista
					</Button>
					<Button bsStyle="success"
						onClick={() => {
							this.props.editSongDatabase({
								songDatabaseId: this.props.songDatabaseId,
								name: this.state.name
							}).then(() => {
								this.props.history.push("/songdatabases");
							});
						}}>
						Tallenna
					</Button>
				</div>
			);
		} else {
			return <div />;
		}
	}
}

export default compose(
	graphql(EDIT_SONG_DATABASE, {
		props: ({ mutate }) => ({
			editSongDatabase: (params) => mutate({
				variables: {
					params
				}
			})
		})
	}),
	graphql(REMOVE_SONG_DATABASE, {
		props: ({ mutate }) => ({
			removeSongDatabase: (id) => mutate({
				variables: {
					songDatabaseId: id
				},
				updateQueries: {
					searchSongDatabases: (prev, { mutationResult }) => {
						return Object.assign({}, prev, {
							songDatabasesConnection: {
								...prev.songDatabasesConnection,
								songDatabases: prev.songDatabasesConnection.songDatabases.filter(p => p.id !== id)
							}
						});
					}
				}
			})
		})	
	}),
	graphql(FETCH_SONG_DATABASE, {
		options: ({
			songDatabaseId
		}) => {
			return {
				variables: {
					songDatabaseId
				}
			};
		},
		props: ({
			data: {
				loading,
				songDatabase
			}
		}) => ({
			loading,
			songDatabase
		})
	}),
	graphql(REMOVE_VARIATION_FROM_SONG_DATABASE, {
		props: ({ mutate }) => ({
			removeVariationFromSongDatabase: (songDatabaseId, variationId) => mutate({
				variables: {
					songDatabaseId,
					variationId
				},
				updateQueries: {
					songDatabase: (prev, { mutationResult }) => {
						return {
							...prev,
							songDatabase: {
								...prev.songDatabase,
								variations: prev.songDatabase.variations.filter(p => p.id !== variationId)
							}
						};
					},
					searchVariations: (prev, { mutationResult }) => {
						console.log("prev", prev, mutationResult);
						// return {
						// 	...prev,
						// 	variationsConnection: {
						// 		...prev.variationsConnection,
						// 		variations: prev.variationsConnection.variations.filter(p => p.id !== mutationResult.data.songDatabaseVariation.variation.id)
						// 	}
						// }
					}
				}
			})
		})
	})
)(EditSongDatabase);