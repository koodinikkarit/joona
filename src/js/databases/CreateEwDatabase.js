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

import CREATE_EW_DATABASE_MUTATION from "./create_ew_database_mutation.graphql";

export class CreateEwDatabase extends React.Component {
	state = {
		name: "",
		selectedSongDatabaseId: ""
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
				<Button bsStyle="success"
					onClick={e => {
						this.props.createEwDatabase({
							name: this.state.name,
							songDatabaseId: this.state.selectedSongDatabaseId
						}).then(() => {
							this.props.history.push("/ewdatabases");
						});
					}}>
					Luo
				</Button>
			</div>
		);
	}
}

export default compose(
	graphql(CREATE_EW_DATABASE_MUTATION, {
		props: ({ mutate }) => ({
			createEwDatabase: (params) => mutate({
				variables: {
					params
				},
				updateQueries: {
					searchEwDatabases: (prev, { mutationResult }) => {
						return Object.assign({}, prev, {
							ewDatabasesConnection: {
								...prev.ewDatabasesConnection,
								ewDatabases: [
									...prev.ewDatabasesConnection.ewDatabases,
									mutationResult.data.ewDatabase
								]
							}
						});
					}
				}
			})
		})
	})
)(CreateEwDatabase);