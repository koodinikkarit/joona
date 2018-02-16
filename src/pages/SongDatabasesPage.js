import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

import { Grid, Button, Panel } from "react-bootstrap";

import SongDatabasesSearch from "../songdatabases/SongDatabasesSearch";

import FieldGroup from "../form/FieldGroup";
import CreateSongDatabase from "../songdatabases/CreateSongDatabase";

const readSelectedSongDatabasesQuery = gql`
	query {
		selectedSongDatabasesQuery @client
	}
`;

class SongDatabasesPage extends Component {
	state = {
		creatingSongDatabase: false
	};

	render() {
		const selectedSongDatabases = this.props.data.grid
			.selectedSongDatabases;

		console.log("data", this.props);

		console.log("selectedSongDatabase", selectedSongDatabases);

		return (
			<div>
				{selectedSongDatabases.join(",")}
				<Grid>
					asd
					{this.state.creatingSongDatabase === true ? (
						<CreateSongDatabase
							onCancel={() => {
								this.setState({
									creatingSongDatabase: false
								});
							}}
							onSuccess={() => {
								this.setState({
									creatingSongDatabase: false
								});
							}}
						/>
					) : (
						<div className="AppendBottom">
							<Button
								bsStyle="info"
								onClick={e => {
									this.setState({
										creatingSongDatabase: true
									});
								}}
							>
								Luo uusi laulutietokanta
							</Button>
						</div>
					)}
					<SongDatabasesSearch
						onSongDatabaseClicked={id => {
							this.props.addSelectedSongDatabase(id);
							console.log("onSongDatabaseClicked", id);
						}}
					/>
				</Grid>
			</div>
		);
	}
}

export default compose(
	graphql(
		gql`
			mutation addSelectedSongDatabase($songDatabaseId: ID) {
				addSelectedSongDatabase(songDatabaseId: $songDatabaseId) @client
			}
		`,
		{
			props: ({ mutate }) => ({
				addSelectedSongDatabase: songDatabaseId =>
					mutate({ variables: { songDatabaseId } })
			})
		}
	),
	graphql(
		gql`
			query readSongDatabasesPageData {
				grid @client {
					selectedSongDatabases
				}
			}
		`
	)
)(SongDatabasesPage);
