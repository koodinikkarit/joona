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
	AppendRight
} from "../styles/Layout.css";

import {
	textInput
} from "../styles/Form.css";

import SongDatabasesSelect from "./SongDatabasesSelect";

import FETCH_EW_DATABASE_QUERY from "./fetch_ew_database_query.graphql";
import EDIT_EW_DATABASE_MUTATION from "./edit_ew_database_mutation.graphql";
import REMOVE_EW_DATBASE_MUTATION from "./remove_ew_database_mutation.graphql";

export class EditEwDatabase extends React.Component {
	state = {
		name: this.props.ewDatabase ? this.props.ewDatabase.name : "",
		selectedSongDatabaseId: this.props.ewDatabase ? this.props.ewDatabase.songDatabaseId : "",
		removeSongsFromExternalDatabase: this.props.ewDatabase ? this.props.ewDatabase.removeSongsFromExternalDatabase : false,
		removeSongsFromSongDatabase: this.props.ewDatabase ? this.props.ewDatabase.removeSongsFromSongDatabase : false,
		variationVersionConflictAction: this.props.ewDatabase ? this.props.ewDatabase.variationVersionConflictAction : null
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.ewDatabase) {
			this.setState({
				name: nextProps.ewDatabase.name ? nextProps.ewDatabase.name : "",
				selectedSongDatabaseId: nextProps.ewDatabase.songDatabaseId,
				removeSongsFromExternalDatabase: this.props.ewDatabase ? this.props.ewDatabase.removeSongsFromExternalDatabase : false,
				removeSongsFromSongDatabase: this.props.ewDatabase ? this.props.ewDatabase.removeSongsFromSongDatabase : false,
				variationVersionConflictAction: this.props.ewDatabase ? this.props.ewDatabase.variationVersionConflictAction : null
			});
		}
	}
	
	render() {
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
				<div className={AppendBottomMedium}>
					<label>
						Avain:
					</label>
					{!this.props.loading && this.props.ewDatabase.databaseKey}
				</div>
				<div>
					<input type="checkbox" checked={this.state.removeSongsFromExternalDatabase}
						onChange={() => {
							this.setState({
								removeSongsFromExternalDatabase: !this.state.removeSongsFromExternalDatabase
							});
						}} />
					Poista lauluja ew tietokannasta
				</div>
				<div>
					<input type="checkbox" checked={this.state.removeSongsFromSongDatabase}
						onChange={() => {
							this.setState({
								removeSongsFromSongDatabase: !this.state.removeSongsFromSongDatabase
							});
						}} />
					Poista lauluja laulutietokannasta
				</div>
				<br />
				<label>
					Konflikti tilanteissa
				</label>
				<div>
					<select value={this.state.variationVersionConflictAction}
						onChange={e => {
							this.setState({
								variationVersionConflictAction: e.target.value
							});
						}}>
						<option value={0}>
							Valitse
						</option>
						<option value={1}>
							Käytä ohjelman versiota
						</option>
						<option value={2}>
							Käytä tietokannan versiota
						</option>
						<option value={3}>
							Ilmoita konflikti tilanteet
						</option>
						<option value={4}>
							Luo uusi oksa
						</option>
					</select>
				</div>
				<br />
				<div className={AppendBottomBig}>
					<label>
						Laulutietokanta
					</label>
					<div>
						<SongDatabasesSelect
							value={this.state.selectedSongDatabaseId}
							onChange={value => {
								this.setState({
									selectedSongDatabaseId: value
								});
							}} />
					</div>
				</div>
				<Link to="/ewdatabases">
					<Button className={AppendRight}>
						Peruuta
					</Button>
				</Link>
				<Button bsStyle="danger" className={AppendRight}
					onClick={e => {
						this.props.removeEwDatabase(this.props.ewDatabase.id).then(data => {
							this.props.history.push("/ewdatabases");
						});
					}}>
					Poista
				</Button>
				<Button bsStyle="success"
					onClick={() => {
						console.log("state", this.state);
						this.props.editEwDatabase({
							ewDatabaseId: this.props.ewDatabase.id,
							name: this.state.name,
							songDatabaseId: this.state.selectedSongDatabaseId,
							removeSongsFromExternalDatabase: this.state.removeSongsFromExternalDatabase,
							removeSongsFromSongDatabase: this.state.removeSongsFromSongDatabase,
							variationVersionConflictAction: this.state.variationVersionConflictAction
						}).then(() => {
							this.props.history.push("/ewdatabases");
						});
					}}>
					Tallenna
				</Button>
			</div>
		);
	}
}

export default compose(
	graphql(FETCH_EW_DATABASE_QUERY, {
		options: ({
			ewDatabaseId
		}) => {
			return {
				variables: {
					ewDatabaseId
				}
			};
		},
		props: ({
			data: {
				loading,
				ewDatabase
			}
		}) => ({
			loading,
			ewDatabase
		})
	}),
	graphql(EDIT_EW_DATABASE_MUTATION, {
		props: ({ mutate }) => ({
			editEwDatabase: (params) => mutate({
				variables: {
					params
				}
			})
		})		
	}),
	graphql(REMOVE_EW_DATBASE_MUTATION, {
		props: ({ mutate }) => ({
			removeEwDatabase: (id) => mutate({
				variables: {
					params: {
						ewDatabaseId: id
					}
				},
				// updateQueries: {
				// 	searchEwDatabases: (prev, { mutationResult }) => {
				// 		return Object.assign({}, prev, {
				// 			ewDatabasesConnection: {
				// 				...prev.ewDatabasesConnection,
				// 				ewDatabases: prev.ewDatabasesConnection.ewDatabases.filter(p => p.id !== id)
				// 			}
				// 		});
				// 	}
				// }
			})
		})
	})
)(EditEwDatabase);