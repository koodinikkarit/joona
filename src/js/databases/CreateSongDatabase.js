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

import CREATE_SONG_DATABASE_MUTATION from "./create_song_database_mutation.graphql";

export class CreateSongDatabase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ""
		};
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
				<Link to="/songdatabases">
					<Button className={AppendRight}>
						Peruuta
					</Button>
				</Link>
				<Button bsStyle="success"
					onClick={e => {
						this.props.createSongDatabase({
							name: this.state.name
						}).then(data => {
							this.props.history.push("/songdatabases");
						})
					}}>
					Luo laulutietokanta
				</Button>
			</div>
		)
	}
}

export default compose(
	graphql(CREATE_SONG_DATABASE_MUTATION, {
		props: ({ mutate }) => ({
			createSongDatabase: ({
				name
			}) => mutate({
				variables: {
					params: {
						name
					}
				},
				updateQueries: {
					searchSongDatabases: (prev, { mutationResult }) => {
						return Object.assign({}, prev, {
							songDatabasesConnection: {
								...prev.songDatabasesConnection,
								songDatabases: [
									...prev.songDatabasesConnection.songDatabases,
									mutationResult.data.songDatabase
								]
							}
						});
					}
				}
			})
		})
	})
)(CreateSongDatabase);