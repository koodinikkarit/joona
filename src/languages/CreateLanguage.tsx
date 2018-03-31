import * as React from "react";
import { Button, Panel, ControlLabel, FormControl } from "react-bootstrap";
import {
	Mutation,
	FetchResult,
	MutationOptions,
	ExecutionResult
} from "react-apollo";
import { CREATE_LANGUAGE_MUTATION, SEARCH_LANGUAGES_QUERY } from "../servergql";
import {
	createLanguageMutationVariables,
	createLanguageMutation,
	searchLanguagesQuery
} from "../types";

export class CreateLanguage extends React.Component<{
	searchWord?: string;
}> {
	state = {
		creatingLanguage: false,
		name: ""
	};

	render() {
		if (!this.state.creatingLanguage) {
			return (
				<Button
					bsStyle="info"
					onClick={() => {
						this.setState({
							creatingLanguage: true
						});
					}}
				>
					Uusi kieli
				</Button>
			);
		}

		return (
			<Mutation
				mutation={CREATE_LANGUAGE_MUTATION}
				update={(
					cache,
					dataContainer: ExecutionResult<createLanguageMutation>
				) => {
					const languagesContainer: searchLanguagesQuery = cache.readQuery(
						{
							query: SEARCH_LANGUAGES_QUERY
						}
					);

					if (dataContainer.data.createLanguage.language) {
						languagesContainer.searchLanguages.languages.unshift(
							dataContainer.data.createLanguage.language
						);

						cache.writeQuery({
							query: SEARCH_LANGUAGES_QUERY,
							data: languagesContainer
						});
					}
				}}
			>
				{(
					createLanguage: (
						props: MutationOptions<createLanguageMutationVariables>
					) => Promise<FetchResult<createLanguageMutation>>
				) => (
					<Panel>
						<Panel.Heading>Luo kieli</Panel.Heading>
						<Panel.Body>
							<div
								style={{
									marginBottom: "10px"
								}}
							>
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
							</div>
							<Button
								style={{
									marginRight: "10px"
								}}
								onClick={() => {
									this.setState({
										creatingLanguage: false,
										name: ""
									});
								}}
							>
								Peruuta
							</Button>
							<Button
								bsStyle="success"
								onClick={() => {
									createLanguage({
										variables: {
											name: this.state.name
										}
									}).then(res => {
										// if (res.data.createTag.success) {
										this.setState({
											creatingLanguage: false,
											name: ""
										});
										// }
									});
								}}
							>
								Luo kieli
							</Button>
						</Panel.Body>
					</Panel>
				)}
			</Mutation>
		);
	}
}
