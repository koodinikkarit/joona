import * as React from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

import {
	PanelGroup,
	Panel,
	FormGroup,
	ControlLabel,
	Button
} from "react-bootstrap";

import { ResizablePanel } from "../layout";

import { FieldGroup, Textarea, Select, Checkbox } from "../forms";

type InputProps = {
	variationId: string;
	className?: string;
	onCancel?: (songId: string) => void;
	onSuccess?: () => void;
};

type ResponseProps = {
	data?: {
		loading: boolean;
		variation?: {
			id: string;
			name: string;
			text: string;
			languageId: number;
			authorId: number;
			songDatabasesConnection: {
				songDatabases: {
					id: string;
				}[];
			};
		};
		changedVariation?: {
			variationId: string;
			name: string;
			text: string;
			addSongDatabaseIds: string[];
			removeSongDatabaseIds: string[];
		};
		searchSongDatabases?: {
			songDatabases?: {
				id: string;
				name: string;
			}[];
			totalCount: number;
		};
	};
	className?: string;
	onCancel?: (songId: string) => void;
	onSuccess?: () => void;
	updateVariation?: (
		args: {
			variationId: string;
			name?: string;
			text?: string;
			addSongDatabaseIds?: string[];
			removeSongDatabaseIds?: string[];
		}
	) => Promise<any>;
	updateState?: (
		args: {
			variationId: string;
			name: string;
			text: string;
			addSongDatabaseIds: number[];
			removeSongDatabaseIds: number[];
		}
	) => void;
};

const EDIT_VARIATION_STATE_QUERY = gql`
	query ReadEditVariationState($variationId: ID) {
		changedVariations(variationId: $variationId) @client {
			name
			text
			addSongDatabaseIds
			removeSongDatabaseIds
		}

		variation(variationId: $variationId) {
			id
			name
			text
			languageId
			authorId
			songDatabasesConnection {
				songDatabases {
					id
				}
			}
		}

		searchSongDatabases {
			totalCount
			songDatabases {
				id
				name
			}
		}
	}
`;

const UPDATE_VARIATION_MUTATION = gql`
	mutation UpdateVariation($params: UpdateVariationInputType) {
		updateVariation(params: $params) {
			success
			variation {
				id
				name
				text
				languageId
				authorId
			}
		}
	}
`;

const CHANGE_VARIATION_MUTATION = gql`
	mutation updateVariationState(
		$variationId: number
		$name: String
		$text: String
		$addSongDatabaseIds: [Int]
		$removeSongDatabaseIds: [Int]
	) {
		updateVariationState(
			variationId: $variationId
			name: $name
			text: $text
			addSongDatabaseIds: $addSongDatabaseIds
			removeSongDatabaseIds: $removeSongDatabaseIds
		) @client
	}
`;

const withData = graphql<ResponseProps, InputProps>(EDIT_VARIATION_STATE_QUERY);

const withUpdateVariation = graphql<ResponseProps, InputProps>(
	UPDATE_VARIATION_MUTATION,
	{
		props: ({ mutate }) => ({
			updateVariation: props =>
				mutate({
					variables: {
						params: props
					}
				})
		})
	}
);

const withChangeVariation = graphql<ResponseProps, InputProps>(
	CHANGE_VARIATION_MUTATION,
	{
		props: ({ mutate }) => ({
			updateState: props =>
				mutate({
					variables: props
				})
		})
	}
);

export const EditVariationResults = compose(
	withData,
	withUpdateVariation,
	withChangeVariation
)((props: ResponseProps) => {
	if (props.data.loading) {
		return <h1>Ladataan...</h1>;
	}
	return (
		<ResizablePanel header="Muokkaa laulua" className={props.className}>
			<FieldGroup
				type="text"
				label="Nimi"
				placeholder="Nimi"
				value={props.data.variation.name}
				delay={400}
				onChange={value => {
					props.updateVariation({
						variationId: props.data.variation.id,
						name: value as string
					});
				}}
			/>
			<PanelGroup>
				<Panel eventKey="1" style={{ cursor: "pointer" }}>
					<Panel.Heading>Tunnisteet</Panel.Heading>
					<Panel.Body>asd</Panel.Body>
				</Panel>
				<Panel eventKey="2" style={{ cursor: "pointer" }}>
					<Panel.Heading>Laulutietokannat</Panel.Heading>
					<Panel.Body>
						{props.data.searchSongDatabases.songDatabases.map(p => (
							<Checkbox
								checked={props.data.variation.songDatabasesConnection.songDatabases.some(
									e => e.id === p.id
								)}
								onChange={checked => {
									if (checked === true) {
										props.updateVariation({
											variationId:
												props.data.variation.id,
											addSongDatabaseIds: [p.id]
										});
									} else {
										props.updateVariation({
											variationId:
												props.data.variation.id,
											removeSongDatabaseIds: [p.id]
										});
									}
								}}
							>
								{p.name}
							</Checkbox>
						))}
					</Panel.Body>
				</Panel>
			</PanelGroup>

			<FormGroup
				controlId="formControlsSelect"
				value={props.data.variation.languageId}
			>
				<ControlLabel>Kieli</ControlLabel>
				<Select>
					<option value="select">suomi</option>
					<option value="other">englanti</option>
				</Select>
			</FormGroup>
			<FormGroup
				controlId="formControlsTextarea"
				style={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column"
				}}
			>
				<ControlLabel>Sisältö</ControlLabel>
				<Textarea
					style={{
						resize: "none",
						flexGrow: 1,
						overflowX: "hidden"
					}}
					value={props.data.variation.text}
					delay={400}
					onChange={value => {
						props.updateVariation({
							variationId: props.data.variation.id,
							text: value
						});
					}}
				/>
			</FormGroup>
			<div style={{ display: "inline" }}>
				<Button
					style={{ marginRight: "10px" }}
					onClick={() => {
						if (props.onCancel) {
							props.onCancel(props.data.variation.id);
						}
					}}
				>
					Peruuta
				</Button>
				<Button bsStyle="danger" style={{ marginRight: "10px" }}>
					Poista
				</Button>
			</div>
		</ResizablePanel>
	);
});

export class EditVariation extends React.Component<{
	variationId: string;
	onCancel: (songId: string) => void;
}> {
	render() {
		return (
			<EditVariationResults
				variationId={this.props.variationId}
				onCancel={this.props.onCancel}
			/>
		);
	}
}
