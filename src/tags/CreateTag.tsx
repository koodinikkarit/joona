import * as React from "react";
import {
	Mutation,
	MutationOptions,
	FetchResult,
	ExecutionResult
} from "react-apollo";

import { Button, Panel, ControlLabel, FormControl } from "react-bootstrap";
import { CREATE_TAG_MUTATION, SEARCH_TAGS_QUERY } from "../servergql";
import {
	createTagMutationVariables,
	createTagMutation,
	searchTagsQuery
} from "../types";

export class CreateTag extends React.Component<{
	searchWord?: string;
}> {
	state = {
		creatingTag: false,
		name: ""
	};

	render() {
		if (!this.state.creatingTag) {
			return (
				<Button
					bsStyle="info"
					onClick={() => {
						this.setState({
							creatingTag: true
						});
					}}
				>
					Uusi tunniste
				</Button>
			);
		}

		return (
			<Mutation
				mutation={CREATE_TAG_MUTATION}
				update={(
					cache,
					dataContainer: ExecutionResult<createTagMutation>
				) => {
					const tags: searchTagsQuery = cache.readQuery({
						query: SEARCH_TAGS_QUERY
					});

					if (dataContainer.data.createTag.tag) {
						tags.searchTags.tags.unshift(
							dataContainer.data.createTag.tag
						);
					}

					cache.writeQuery({
						query: SEARCH_TAGS_QUERY,
						data: tags
					});
				}}
			>
				{(
					createTag: (
						props: MutationOptions<createTagMutationVariables>
					) => Promise<FetchResult<createTagMutation>>
				) => (
					<Panel>
						<Panel.Heading>Luo tunniste</Panel.Heading>
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
								style={{
									marginRight: "10px"
								}}
								onClick={() => {
									this.setState({
										creatingTag: false,
										name: ""
									});
								}}
							>
								Peruuta
							</Button>
							<Button
								bsStyle="success"
								onClick={() => {
									createTag({
										variables: {
											name: this.state.name
										}
									}).then(res => {
										// if (res.data.createTag.success) {
										this.setState({
											creatingTag: false,
											name: ""
										});
										// }
									});
								}}
							>
								Luo tunniste
							</Button>
						</Panel.Body>
					</Panel>
				)}
			</Mutation>
		);
	}
}
