import * as React from "react";

import { Mutation, MutationOptions, FetchResult } from "react-apollo";

import { Button, Panel, FormControl } from "react-bootstrap";
import { AppendBottom } from "../layout";
import {
	createEwDatabaseMutation,
	createEwDatabaseMutationVariables
} from "../types";
import { CREATE_EW_DATABASE_MUTATION } from "../servergql";

export class CreateEwDatabase extends React.Component {
	state = {
		creatingEwDatabase: false,
		name: ""
	};

	render() {
		if (!this.state.creatingEwDatabase) {
			return (
				<Button
					bsStyle="info"
					onClick={() => {
						this.setState({
							creatingEwDatabase: true
						});
					}}
				>
					Luo ewlaulutietokanta
				</Button>
			);
		}
		return (
			<Panel>
				<Panel.Heading>Luo ewlaulutietokanta</Panel.Heading>
				<Panel.Body>
					<AppendBottom>
						<FormControl
							type="text"
							placeholder="Nimi"
							onChange={e => {
								const target = e.target as HTMLInputElement;
								this.setState({
									name: target.value
								});
							}}
						/>
					</AppendBottom>
					<Button
						style={{
							marginRight: "10px"
						}}
						onClick={() => {
							this.setState({
								creatingEwDatabase: false
							});
						}}
					>
						Peruuta
					</Button>
					<Mutation mutation={CREATE_EW_DATABASE_MUTATION}>
						{(
							createEwDatabase: (
								props: MutationOptions<
									createEwDatabaseMutation,
									createEwDatabaseMutationVariables
								>
							) => Promise<FetchResult<createEwDatabaseMutation>>
						) => (
							<Button
								bsStyle="success"
								onClick={() => {
									createEwDatabase({
										variables: {
											name: this.state.name
										}
									});
								}}
							>
								Luo
							</Button>
						)}
					</Mutation>
				</Panel.Body>
			</Panel>
		);
	}
}
