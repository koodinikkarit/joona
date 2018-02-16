import React, { Component } from "react";
import gql from "graphql-tag";
import graphql from "react-apollo/graphql";

import { Button, Panel } from "react-bootstrap";

import FieldGroup from "../form/FieldGroup";

import SearchSongDatabasesQuery from "./SearchSongDatabasesQuery";

const createSongDatabaseMutation = gql`
	mutation createSongDatabase($name: String) {
		songDatabase: createSongDatabase(name: $name) {
			id
			name
		}
	}
`;

class CreateSongDatabase extends Component {
	state = {
		name: ""
	};

	render() {
		return (
			<Panel header="Luo uusi laulutietokanta">
				<FieldGroup
					type="text"
					label="Nimi"
					placeholder="Nimi"
					value={this.state.name}
					onChange={value => {
						this.setState({
							name: value
						});
					}}
				/>

				<Button
					style={{ marginRight: "10px" }}
					onClick={() => {
						if (this.props.onCancel) {
							this.props.onCancel();
						}
					}}
				>
					Peruuta
				</Button>
				<Button
					bsStyle="success"
					onClick={() => {
						this.props
							.createSongDatabase({
								name: this.state.name
							})
							.then(() => {
								if (this.props.onSuccess) {
									this.props.onSuccess();
								}
							});
					}}
				>
					Tallenna
				</Button>
			</Panel>
		);
	}
}

const query = gql`
	query searchSongDatabases {
		searchSongDatabases {
			maxSongDatabases
			songDatabases {
				id
				name
			}
		}
	}
`;

export default graphql(createSongDatabaseMutation, {
	props: ({ mutate }) => ({
		createSongDatabase: ({ name }) => {
			return mutate({
				variables: { name },
				update: (proxy, { data: { songDatabase } }) => {
					const data = proxy.readQuery({
						query: query
					});
					console.log("data", data, "new songDatabase", songDatabase);
					data.searchSongDatabases.maxSongDatabases += 1;
					data.searchSongDatabases.songDatabases.push(songDatabase);
					proxy.writeQuery({ query, data });
				}
			});
		}
	})
})(CreateSongDatabase);
