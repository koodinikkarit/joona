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

import SongsMultiselect from "../songs/SongsMultiselect";

import FETCH_SONG_DATABASE from "./fetch_song_database_query.graphql";
import EDIT_SONG_DATABASE from "./edit_song_database_mutation.graphql";
import REMOVE_SONG_DATABASE from "./remove_song_database.graphql";
import REMOVE_VARIATION_FROM_SONG_DATABASE from "./remove_variation_from_song_database.graphql";
import SEARCH_TAGS_QUERY from "../tags/search_tags.graphql";

export class EditSongDatabase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.songDatabase ? this.props.songDatabase.name : "",
			changedTagStates: {}
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
						<label>
							Tunnisteet
						</label>
						<div className={AppendBottomMedium + " " + RectBox + " " + BoxInnerMedium}
							style={{
								maxHeight: "200px",
								overflowY: "auto"
							}}>
							{this.props.tags.map(p => {
								var checked = this.state.changedTagStates[p.id] != null ?
									this.state.changedTagStates[p.id] :
									this.props.songDatabase.tags.some(e => e.id === p.id);
								return (
									<div key={p.id}>
										<input type="checkbox" checked={checked} 
											onChange={() => {
												this.setState({
													changedTagStates: {
														...this.state.changedTagStates,
														[p.id]: !checked
													}
												});
											}} />
										{" " + p.name}
									</div>
								);
							})}
						</div>
						{/* <div className={AppendBottomBig}>
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
											onClick={() => {
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
						</div> */}
					</div>
					<Link to="/songdatabases">
						<Button className={AppendRight}>
							Peruuta
						</Button>
					</Link>
					<Button bsStyle="danger" className={AppendRight}
						onClick={() => {
							this.props.removeSongDatabase(this.props.songDatabase.id).then(() => {
								this.props.history.push("/songdatabases");
							});
						}}>
						Poista
					</Button>
					<Button bsStyle="success"
						onClick={() => {
							let addTagIds = [];
							let removeTagIds = [];

							Object.keys(this.state.changedTagStates).forEach(key => {
								let state = this.state.changedTagStates[key];
								if (state === true) {
									addTagIds.push(key);
								} else if (state === false) {
									removeTagIds.push(key);
								}
							});

							this.props.editSongDatabase({
								songDatabaseId: this.props.songDatabaseId,
								name: this.state.name,
								addTagIds,
								removeTagIds
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
					searchSongDatabases: (prev) => {
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
	graphql(SEARCH_TAGS_QUERY, {
		options: () => {
			return {
				variables: {
					params: {
					
					}
				}
			};
		},
		props: ({
			data: {
				loading,
				tagsConnection
			}
		}) => ({
			loadingTags: loading,
			tags: !loading ? tagsConnection.tags : []
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
					songDatabase: (prev) => {
						return {
							...prev,
							songDatabase: {
								...prev.songDatabase,
								variations: prev.songDatabase.variations.filter(p => p.id !== variationId)
							}
						};
					}
				}
			})
		})
	})
)(EditSongDatabase);