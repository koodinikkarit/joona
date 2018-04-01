import * as React from "react";
import { Button, Panel, ControlLabel, FormControl } from "react-bootstrap";
import { CREATE_AUTHOR_MUTATION, AUTHORS_SEARCH_QUERY } from "../servergql";
import {
	ExecutionResult,
	Mutation,
	FetchResult,
	MutationOptions
} from "react-apollo";
import {
	createAuthorMutation,
	searchAuthorsQuery,
	createAuthorMutationVariables
} from "../types";

export class CreateAuthor extends React.Component {
	state = {
		creatingAuthor: false,
		name: ""
	};

	render() {
		if (!this.state.creatingAuthor) {
			return (
				<Button
					onClick={() => {
						this.setState({
							creatingAuthor: true
						});
					}}
					bsStyle="info"
				>
					Luo kirjailija
				</Button>
			);
		}

		return (
			<Mutation
				mutation={CREATE_AUTHOR_MUTATION}
				update={(cache, res: ExecutionResult<createAuthorMutation>) => {
					const authorsContainer: searchAuthorsQuery = cache.readQuery(
						{
							query: AUTHORS_SEARCH_QUERY
						}
					);

					if (res.data.createAuthor.author) {
						authorsContainer.searchAuthors.authors.unshift(
							res.data.createAuthor.author
						);

						cache.writeQuery({
							query: AUTHORS_SEARCH_QUERY,
							data: authorsContainer
						});
					}
				}}
			>
				{(
					createAuthor: (
						props: MutationOptions<createAuthorMutationVariables>
					) => Promise<FetchResult<createAuthorMutation>>
				) => (
					<Panel>
						<Panel.Heading>Luo kirjoittaja</Panel.Heading>
						<Panel.Body>
							<div
								style={{
									marginBottom: "10px"
								}}
							>
								<ControlLabel>Nimi</ControlLabel>
								<FormControl
									type="text"
									value={this.state.name}
									placeholder="Nimi"
									onChange={e => {
										const target = e.target as HTMLInputElement;
										this.setState({
											name: target.value
										});
									}}
								/>
							</div>
							<Button
								onClick={() => {
									this.setState({
										name: "",
										creatingAuthor: false
									});
								}}
								style={{
									marginRight: "10px"
								}}
							>
								Peruuta
							</Button>
							<Button
								bsStyle="success"
								onClick={() => {
									createAuthor({
										variables: {
											name: this.state.name
										}
									}).then(() => {
										this.setState({
											name: "",
											creatingAuthor: false
										});
									});
								}}
							>
								Luo kirjailija
							</Button>
						</Panel.Body>
					</Panel>
				)}
			</Mutation>
		);
	}
}
