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

import FETCH_SONG_DATABASE from "./fetch_song_database_query.graphql";
import EDIT_SONG_DATABASE from "./edit_song_database_mutation.graphql";
import REMOVE_SONG_DATABASE from "./remove_song_database.graphql";

export class EditSongDatabase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ""
		}
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
						onClick={e => {
							this.props.editSongDatabase({
								songDatabaseId: this.props.songDatabaseId,
								name: this.state.name
							}).then(data => {
								this.props.history.push("/songdatabases");
							});
						}}>
						Tallenna
				</Button>
				</div>
			)
		} else {
			return <div />
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
			}
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
	})
)(EditSongDatabase);