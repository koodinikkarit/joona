import * as React from "react";

import { Mutation, MutationOptions, FetchResult } from "react-apollo";

import { Panel, ControlLabel, FormControl, Button } from "react-bootstrap";
import { AppendBottom } from "../layout";
import {
	CREATE_SONG_DATABASE,
	SONG_DATABASES_QUERY
} from "../servergql/songdatabase";
import {
	createSongDatabaseMutation,
	createSongDatabaseMutationVariables,
	getSongDatabasesQuery
} from "../types";

export class CreateSongDatabase extends React.Component {
	state = {
		creatingSongDatabase: false,
		name: ""
	};

	render() {
		if (!this.state.creatingSongDatabase) {
			return (
				<Button
					onClick={() => {
						this.setState({
							creatingSongDatabase: true
						});
					}}
				>
					Luo laulutietokanta
				</Button>
			);
		}

		return (
			<Panel>
				<Panel.Heading>Luo laulutietokanta</Panel.Heading>
				<Panel.Body>
					<AppendBottom>
						<ControlLabel>Nimi</ControlLabel>
						<FormControl
							type="text"
							placeholder="Nimi"
							value={this.state.name}
							onChange={e => {
								const target = e.target as HTMLInputElement;

								this.setState({
									name: target.value
								});
							}}
						/>
					</AppendBottom>
					<Button
						onClick={() => {
							this.setState({
								creatingSongDatabase: false
							});
						}}
						style={{
							marginRight: "10px"
						}}
					>
						Peruuta
					</Button>
					<Mutation
						mutation={CREATE_SONG_DATABASE}
						update={(
							cache,
							res: FetchResult<createSongDatabaseMutation>
						) => {
							if (res.data.createSongDatabase) {
								const songDatabases: getSongDatabasesQuery = cache.readQuery(
									{
										query: SONG_DATABASES_QUERY
									}
								);

								songDatabases.searchSongDatabases.songDatabases.push(
									res.data.createSongDatabase
								);
								songDatabases.searchSongDatabases.totalCount++;
								cache.writeQuery({
									query: SONG_DATABASES_QUERY,
									data: songDatabases
								});
							}
						}}
					>
						{(
							createSongDatabase: (
								props: MutationOptions<
									createSongDatabaseMutation,
									createSongDatabaseMutationVariables
								>
							) => Promise<
								FetchResult<createSongDatabaseMutation>
							>
						) => (
							<Button
								bsStyle="success"
								onClick={() => {
									createSongDatabase({
										variables: {
											name: this.state.name
										}
									}).then(() => {
										this.setState({
											creatingSongDatabase: false
										});
									});
								}}
							>
								Tallenna
							</Button>
						)}
					</Mutation>
				</Panel.Body>
			</Panel>
		);
	}
}
