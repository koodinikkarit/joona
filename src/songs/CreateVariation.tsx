// import * as React from "react";
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
