import * as React from "react";
import {
	Button,
	Panel,
	FormGroup,
	ControlLabel,
	FormControl
} from "react-bootstrap";
import {
	Mutation,
	ExecutionResult,
	FetchResult,
	MutationOptions
} from "react-apollo";
import {
	CREATE_COPYRIGHT_MUTATION,
	COPYRIGHT_SEARCH_QUERY
} from "../servergql";
import {
	createCopyrightMutation,
	searchCopyrightsQuery,
	createCopyrightMutationVariables
} from "../types";

export class CreateCopyright extends React.Component {
	state = {
		creatingCopyright: false,
		name: ""
	};

	render() {
		if (!this.state.creatingCopyright) {
			return (
				<Button
					bsStyle="info"
					onClick={() => {
						this.setState({
							creatingCopyright: true
						});
					}}
				>
					Luo tekijänoikeus
				</Button>
			);
		}

		return (
			<Mutation
				mutation={CREATE_COPYRIGHT_MUTATION}
				update={(
					cache,
					res: ExecutionResult<createCopyrightMutation>
				) => {
					const copyrightsContainer: searchCopyrightsQuery = cache.readQuery(
						{
							query: COPYRIGHT_SEARCH_QUERY
						}
					);

					if (res.data.createCopyright.copyright) {
						copyrightsContainer.searchCopyrights.copyrights.unshift(
							res.data.createCopyright.copyright
						);

						cache.writeQuery({
							query: COPYRIGHT_SEARCH_QUERY,
							data: copyrightsContainer
						});
					}
				}}
			>
				{(
					createCopyright: (
						props: MutationOptions<createCopyrightMutationVariables>
					) => Promise<FetchResult<createCopyrightMutation>>
				) => (
					<Panel>
						<Panel.Heading>Luo tekijänoikeus</Panel.Heading>
						<Panel.Body>
							<FormGroup>
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
							</FormGroup>
							<Button
								onClick={() => {
									this.setState({
										creatingCopyright: false,
										name: ""
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
									createCopyright({
										variables: {
											name: this.state.name
										}
									}).then(() => {
										this.setState({
											creatingCopyright: false,
											name: ""
										});
									});
								}}
							>
								Tallenna
							</Button>
						</Panel.Body>
					</Panel>
				)}
			</Mutation>
		);
	}
}
