import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import {
	Link
} from "react-router-dom";

import Button from "react-bootstrap/lib/Button";
import FormControl from "react-bootstrap/lib/FormControl";

import {
	RectBox,
	BoxInnerMedium,
	AppendBottomMedium,
	AppendBottomBig,
	AppendRight
} from "../styles/Layout.css";

import {
	textInput
} from "../styles/Form.css";

import {
	VariationTextArea
} from "./EditSong.css";

import FETCH_VARIATION_QUERY from "./fetch_variation_query.graphql";
import EDIT_VARIATION_MUTATION from "./edit_variation_mutation.graphql";
import REMOVE_VARIATION_MUTATION from "./remove_variation_mutation.graphql";
import ADD_TAG_TO_VARIATION_MUTATION from "./add_tag_to_variation.graphql";
import REMOVE_TAG_FROM_VARIATION_MUTATION from "./remove_tag_from_variation.graphql";
import SEARCH_TAGS_QUERY from "../tags/search_tags.graphql";
import SEARCH_SONG_DATABASES_QUERY from "../databases/search_song_databases.graphql";
import ADD_VARIATION_TO_SONG_DATABASE_MUTATION from "../pages/add_variation_to_song_database_mutation.graphql";
import REMOVE_VARIATION_FROM_SONG_DATABASE_MUTATION from "../databases/remove_variation_from_song_database.graphql";
import SEARCH_LANGUAGES_QUERY from "../languages/search_languages.graphql";

export class EditSong extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			text: "",
			languageId: ""
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.variation) {
			this.setState({
				name: nextProps.variation.name,
				text: nextProps.variation.text,
				languageId: nextProps.variation.languageId
			});
		}
	}

	render() {


		if (this.props.loadingVariation || 
			this.props.loadingTags ||
			this.props.loadingSongDatabases) {
			return <div />;
		} else {
			return (
				<div className={RectBox + " " + BoxInnerMedium + " " + AppendBottomBig}>
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
							let checked = this.props.variation.tags.some(e => e.id === p.id);
							return (
								<div key={p.id}>
									<input type="checkbox" checked={checked} onChange={() => {
										if (checked) {
											this.props.removeTagFromVariation(
												p.id, 
												this.props.variation.id
											);
										} else {
											this.props.addTagToVariation(
												p.id, 
												this.props.variation.id
											);
										}
									}} />
									{" " + p.name}
								</div>
							);
						})}
					</div>
					<label>
						Laulutietokannat
					</label>
					<div className={AppendBottomMedium + " " + RectBox + " " + BoxInnerMedium}
						style={{
							maxHeight: "200px",
							overflowY: "auto"
						}}>
						{this.props.songDatabases.map(p => {
							var checked = this.props.variation.songDatabases.some(e => e.id === p.id);
							return (
								<div key={p.id}>
									<input type="checkbox" checked={checked} onChange={() => {
										if (checked) {
											this.props.removeVariationFromSongDatabase(
												p.id,
												this.props.variation.id
											);
										} else {
											this.props.addVariationToSongDatabase(
												p.id,
												this.props.variation.id
											);
										}
									}} />
									{" " + p.name}
								</div>
							);
						})}
					</div>
					<label>
						Kieli
					</label>
					<div className={AppendBottomMedium}>
						<FormControl componentClass="select" placeholder="select"
							value={this.state.languageId}
							onChange={(e) => {
								this.setState({
									languageId: e.target.value
								});
							}}>
							<option>Valitse</option>
							{this.props.languages.map(p => (
								<option key={p.id} value={p.id}>
									{p.name}
								</option>
							))}
						</FormControl>
					</div>
					<label>
						Sisältö
					</label>
					<div className={AppendBottomMedium}>
						<textarea value={this.state.text} className={VariationTextArea}
							onChange={e => {
								this.setState({
									text: e.target.value
								});
							}} />
					</div>
					<Link to={this.props.getCancelLinkPath ? this.props.getCancelLinkPath() : ""}>
						<Button className={AppendRight}>
							Peruuta
						</Button>
					</Link>
					<Button bsStyle="danger" className={AppendRight}
						onClick={() => {
							this.props.removeVariation(this.props.variation.id).then(() => {
								if (this.props.onRemove) {
									this.props.onRemove();
								}
							});
						}}>
						Poista
					</Button>
					<Button bsStyle="success"
						onClick={() => {
							this.props.editVariation({
								variationId: this.props.variation.id,
								name: this.state.name,
								text: this.state.text,
								languageId: this.state.languageId
							}).then(() => {
								if (this.props.onSuccess) {
									this.props.onSuccess();
								}
							});
						}}>
						Tallenna
					</Button>
				</div>
			);
		}
	}
}

export default compose(
	graphql(FETCH_VARIATION_QUERY, {
		options: (ownProps) => {
			return {
				variables: {
					variationId: ownProps.variationId
				}
			};
		},
		props: ({
			data: {
				loading,
				variation
			}
		}) => ({
			loadingVariation: loading,
			variation: variation
		})
	}),
	graphql(EDIT_VARIATION_MUTATION, {
		props: ({ mutate }) => ({
			editVariation: (params) => mutate({
				variables: {
					params
				}
			})
		})
	}),
	graphql(REMOVE_VARIATION_MUTATION, {
		props: ({ mutate }) => ({
			removeVariation: (id) => mutate({
				variables: {
					variationId: id
				},
				updateQueries: {
					searchVariations: (prev, { mutationResult }) => {
						return Object.assign({}, prev, {
							variationsConnection: {
								...prev.variationsConnection,
								variations: prev.variationsConnection.variations.filter(p => p.id !== id)
							}
						});
					}
				}
			})
		})	
	}),
	graphql(SEARCH_TAGS_QUERY, {
		options: () => {
			return {
				variables: {
					parmas: {

					}
				},
				fetchPolicy: "cache-and-network"
			};
		},
		props: ({
			data: {
				loading,
				maxTags,
				tagsConnection
			}
		}) => ({
			loadingTags: loading,
			maxTags,
			tags: !loading ? tagsConnection.tags : []
		})
	}),
	graphql(ADD_TAG_TO_VARIATION_MUTATION, {
		props: ({ mutate }) => ({
			addTagToVariation: (
				tagId,
				variationId
			) => mutate({
				variables: {
					tagId,
					variationId
				},
				updateQueries: {
					variation: (prev, { mutationResult }) => {
						if (prev.variation.id === variationId) {
							return {
								...prev,
								variation: {
									...prev.variation,
									tags: [
										...prev.variation.tags, //.filter(p => p.id !== tagId)
										mutationResult.data.tagVariation.tag
									]
								}
							};
						}
					}
				}
			})
		})		
	}),
	graphql(REMOVE_TAG_FROM_VARIATION_MUTATION, {
		props: ({ mutate }) => ({
			removeTagFromVariation: (
				tagId,
				variationId
			) => mutate({
				variables: {
					tagId,
					variationId
				},
				updateQueries: {
					variation: (prev, { mutationResult }) => {
						if (
							mutationResult.data.removeTagFromVariation &&
							prev.variation.id === variationId
						) {
							return {
								...prev,
								variation: {
									...prev.variation,
									tags: prev.variation.tags.filter(p => p.id !== tagId)
								}
							};
						}
					}
				}
			})
		})
	}),
	graphql(SEARCH_SONG_DATABASES_QUERY, {
		options: () => {
			return {
				variables: {
					parmas: {

					}
				}
			};
		},
		props: ({
			data: {
				loading,
				songDatabasesConnection
			}
		}) => ({
			loadingSongDatabases: loading,
			songDatabases: !loading ? songDatabasesConnection.songDatabases : []
		})		
	}),
	graphql(ADD_VARIATION_TO_SONG_DATABASE_MUTATION, {
		props: ({ mutate }) => ({
			addVariationToSongDatabase: (songDatabaseId, variationId) => mutate({
				variables: {
					songDatabaseId,
					variationId
				},
				updateQueries: {
					variation: (prev, {
						mutationResult
					}) => {
						if (prev.variation.id === variationId) {						
							return {
								...prev,
								variation: {
									...prev.variation,
									songDatabases: [
										...prev.variation.songDatabases,
										mutationResult.data.songDatabaseVariation.songDatabase
									]
								}
							};
						}
					}
				}
			})
		})
	}),
	graphql(REMOVE_VARIATION_FROM_SONG_DATABASE_MUTATION, {
		props: ({ mutate }) => ({
			removeVariationFromSongDatabase: (songDatabaseId, variationId) => mutate({
				variables: {
					songDatabaseId,
					variationId
				},
				updateQueries: {
					variation: (prev) => {
						if (prev.variation.id === variationId) {						
							return {
								...prev,
								variation: {
									...prev.variation,
									songDatabases: prev.variation.songDatabases.filter(p => p.id !== songDatabaseId)
								}
							};
						}
					}
				}
			})
		})
	}),
	graphql(SEARCH_LANGUAGES_QUERY, {
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
				languagesConnection
			}
		}) => ({
			languages: loading ? [] : languagesConnection.languages
		})
	})
)(EditSong);