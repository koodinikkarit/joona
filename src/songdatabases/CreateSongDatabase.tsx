import * as React from "react";
import gql from "graphql-tag";
import { graphql, ChildProps } from "react-apollo";

import { Button, Panel, FormGroup, ControlLabel } from "react-bootstrap";

import { TextInput } from "../forms";

// import {
// 	searchSongDatabasesQuery,
// 	SearchSongDatabasesQueryResponseType
// } from "./";

import { SongDatabaseType } from "../types";

type InputProps = {
	onSuccess?: () => void;
	onCancel?: () => void;
};

type ResponseProps = {
	onSuccess?: () => void;
	onCancel?: () => void;
	createSongDatabase?: (props: { name: string }) => Promise<SongDatabaseType>;
};

const withCreateSongDatabaseMutation = graphql<InputProps, ResponseProps>(
	gql`
		mutation createSongDatabase($name: String) {
			songDatabase: createSongDatabase(name: $name) {
				id
				name
			}
		}
	`,
	{
		props: ({ mutate }) => ({
			data: {
				createSongDatabase: props =>
					mutate({
						variables: props,
						update: (proxy, dataContainer: any) => {
							// const data: SearchSongDatabasesQueryResponseType = proxy.readQuery(
							// 	{
							// 		query: searchSongDatabasesQuery
							// 	}
							// );
							// data.allSongDatabases.maxSongDatabases += 1;
							// data.allSongDatabases.songDatabases.push(
							// 	songDatabase
							// );
							// proxy.writeQuery({
							// 	query: searchSongDatabasesQuery,
							// 	data
							// });
						}
					})
			}
		})
	}
);

export const CreateSongDatabase = withCreateSongDatabaseMutation(
	class extends React.Component<ChildProps<InputProps, ResponseProps>, {}> {
		state = {
			name: ""
		};

		render() {
			if (this.props.data.loading) {
				return <div />;
			}

			return (
				<Panel>
					<Panel.Heading>Luo uusi laulutietokanta</Panel.Heading>
					<Panel.Body>
						<FormGroup>
							<ControlLabel>Nimi</ControlLabel>
							<TextInput
								placeholder="Nimi"
								value={this.state.name}
								onChange={value => {
									this.setState({
										name: value
									});
								}}
							/>
						</FormGroup>

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
								this.props.data
									.createSongDatabase({
										name: this.state.name
									})
									.then(() => {
										this.props.onSuccess();
									});
							}}
						>
							Tallenna
						</Button>
					</Panel.Body>
				</Panel>
			);
		}
	}
);
