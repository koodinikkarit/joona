import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import {
  Link
} from 'react-router-dom'

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
		name: "",
		selectedSongDatabaseId: ""
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.ewDatabase) {
			console.log("name", nextProps.ewDatabase.name ? nextProps.ewDatabase.name : "");
			this.setState({
				name: nextProps.ewDatabase.name ? nextProps.ewDatabase.name : "",
				selectedSongDatabaseId: nextProps.ewDatabase.songDatabase ? nextProps.ewDatabase.songDatabase.id : null
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
								})
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
					onClick={e => {
						this.props.editEwDatabase({
							ewDatabaseId: this.props.ewDatabase.id,
							name: this.state.name,
							songDatabaseId: this.state.selectedSongDatabaseId
						}).then(data => {
							this.props.history.push("/ewdatabases");
						});
					}}>
					Tallenna
				</Button>
			</div>
		)
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
			}
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
					ewDatabaseId: id
				},
				updateQueries: {
					searchEwDatabases: (prev, { mutationResult }) => {
						return Object.assign({}, prev, {
							ewDatabasesConnection: {
								...prev.ewDatabasesConnection,
								ewDatabases: prev.ewDatabasesConnection.ewDatabases.filter(p => p.id !== id)
							}
						});
					}
				}
			})
		})
	})
)(EditEwDatabase);