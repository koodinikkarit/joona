import * as React from "react";
import {
	Mutation,
	MutationOptions,
	ExecutionResult,
	FetchResult
} from "react-apollo";

import { Panel, Button, ControlLabel, FormControl } from "react-bootstrap";
import { AppendBottom } from "../layout";

import TextareaAutosize from "react-autosize-textarea";
import {
	CREATE_VARIATION_MUTATION,
	SEARCH_VARIATIONS_QUERY
} from "../servergql";

import {
	createVariationMutationVariables,
	createVariationMutation,
	searchVariationsQuery
} from "../types";

export class CreateVariation extends React.Component<{
	onCancel?: () => void;
	onSuccess: () => void;
}> {
	state = {
		name: "",
		text: ""
	};

	render() {
		return (
			<Mutation
				mutation={CREATE_VARIATION_MUTATION}
				update={(
					cache,
					res: ExecutionResult<createVariationMutation>
				) => {
					if (res.data.createVariation) {
						const variations: searchVariationsQuery = cache.readQuery(
							{
								query: SEARCH_VARIATIONS_QUERY
							}
						);

						variations.searchVariations.variations.unshift(
							res.data.createVariation
						);

						cache.writeQuery({
							query: SEARCH_VARIATIONS_QUERY,
							data: variations
						});
					}
				}}
			>
				{(
					createVariation: (
						props: MutationOptions<
							createVariationMutation,
							createVariationMutationVariables
						>
					) => Promise<FetchResult<createVariationMutation>>
				) => (
					<Panel>
						<Panel.Heading>Luo laulu</Panel.Heading>
						<Panel.Body>
							<AppendBottom>
								<ControlLabel>Nimi</ControlLabel>
								<FormControl
									type="text"
									style={{
										maxWidth: "400px"
									}}
									value={this.state.name}
									onChange={e => {
										const target = e.target as HTMLInputElement;
										this.setState({
											name: target.value
										});
									}}
								/>
							</AppendBottom>
							<AppendBottom>
								<TextareaAutosize
									style={{
										width: "100%",
										resize: "none",
										maxHeight: "800px"
									}}
									className="form-control"
									onChange={e => {
										const target = e.target as HTMLInputElement;
										this.setState({
											text: target.value
										});
									}}
								/>
							</AppendBottom>

							<Button
								style={{
									marginRight: "10px"
								}}
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
									createVariation({
										variables: {
											name: this.state.name,
											text: this.state.text
										}
									}).then(() => {
										this.props.onSuccess();
									});
								}}
							>
								Luo
							</Button>
						</Panel.Body>
					</Panel>
				)}
			</Mutation>
		);
	}
}

// import gql from "graphql-tag";
// import { graphql, compose } from "react-apollo";

// import { Panel, Button } from "react-bootstrap";

// import { FieldGroup } from "../forms";

// type InputProps = {
// 	onCancel?: () => void;
// 	onSuccess?: () => void;
// };

// type ResponseProps = {
// 	data?: {
// 		loading: boolean;
// 		createVariationState?: {
// 			name: string;
// 			text: string;
// 		};
// 	};
// 	updateCreateVariationState?: (
// 		props: {
// 			name?: string;
// 			text?: string;
// 		}
// 	) => void;
// 	createVariation?: (
// 		props: {
// 			name: string;
// 			text: string;
// 		}
// 	) => Promise<any>;
// 	onCancel?: () => void;
// 	onSuccess?: () => void;
// };

// const CREATE_VARIATION_STATE_QUERY = gql`
// 	query createVariationState {
// 		createVariationState @client {
// 			name
// 			text
// 		}
// 	}
// `;

// const UPDATE_CREATE_VARIATION_MUTATION = gql`
// 	mutation updateCreateVariationState($name: string, $text: string) {
// 		updateCreateVariationState(name: $name, text: $text) @client
// 	}
// `;

// const CREATE_VARIATION_MUTATION = gql`
// 	mutation CreateVariation($name: String, $text: String) {
// 		createVariation(name: $name, text: $text) {
// 			id
// 			name
// 			text
// 		}
// 	}
// `;

// const withCreateVariationState = graphql<ResponseProps, InputProps>(
// 	CREATE_VARIATION_STATE_QUERY
// );
// const withUpdateCreateVariationState = graphql<ResponseProps, InputProps>(
// 	UPDATE_CREATE_VARIATION_MUTATION,
// 	{
// 		props: ({ mutate }) => ({
// 			updateCreateVariationState: props =>
// 				mutate({
// 					variables: props
// 				})
// 		})
// 	}
// );
// const withCreateVariation = graphql<ResponseProps, InputProps>(
// 	CREATE_VARIATION_MUTATION,
// 	{
// 		props: ({ mutate }) => ({
// 			createVariation: props =>
// 				mutate({
// 					variables: props
// 				})
// 		})
// 	}
// );

// export const CreateVariation = compose(
// 	withCreateVariationState,
// 	withUpdateCreateVariationState,
// 	withCreateVariation
// )((props: ResponseProps) => {
// 	if (props.data.loading) {
// 		return <h1>Ladataan...</h1>;
// 	}
// 	return (
// 		<Panel>
// 			<Panel.Heading>Luo laulu</Panel.Heading>
// 			<Panel.Body>
// 				<FieldGroup
// 					type="text"
// 					label="Nimi"
// 					placeholder="Nimi"
// 					value={props.data.createVariationState.name}
// 					onChange={value => {
// 						props.updateCreateVariationState({
// 							name: value as string
// 						});
// 					}}
// 				/>
// 				<label>Sisältö</label>
// 				<div>
// 					<textarea
// 						value={props.data.createVariationState.text}
// 						className="VariationTextArea"
// 						onChange={e => {
// 							props.updateCreateVariationState({
// 								text: e.target.value
// 							});
// 						}}
// 					/>
// 				</div>
// 				<Button
// 					style={{ marginRight: "10px" }}
// 					onClick={() => {
// 						if (props.onCancel) {
// 							props.onCancel();
// 						}
// 					}}
// 				>
// 					Peruuta
// 				</Button>
// 				<Button
// 					bsStyle="success"
// 					onClick={() => {
// 						props
// 							.createVariation({
// 								name: props.data.createVariationState.name,
// 								text: props.data.createVariationState.text
// 							})
// 							.then(() => {
// 								if (props.onSuccess) {
// 									props.onSuccess();
// 								}
// 							});
// 					}}
// 				>
// 					Luo laulu
// 				</Button>
// 			</Panel.Body>
// 		</Panel>
// 	);
// });
