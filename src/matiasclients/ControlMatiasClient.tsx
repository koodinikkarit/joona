import * as React from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import { Panel, Button } from "react-bootstrap";

import { MatiasClientEwDatabases, CreateEwDatabase } from "./";

import { FieldGroup } from "../forms";

import { MatiasClientType } from "../types";

import { ControlMatiasClientStateType } from "../resolvers";

type InputProps = {
	matiasClientId?: number;
};

type ResponseProps = {
	data?: {
		loading: boolean;
		matiasClient?: MatiasClientType;
		controlMatiasClientState: ControlMatiasClientStateType;
	};
	matiasClientId?: number;
	updateState?: (props: ControlMatiasClientStateType) => void;
	updateMatiasClient?: (
		props: {
			matiasClientId: number;
			name?: string;
			accepted?: boolean;
		}
	) => Promise<any>;
};

const withMatiasClient = graphql<ResponseProps, InputProps>(
	gql`
		query readMatiasClientData($matiasClientId: ID) {
			controlMatiasClientState @client {
				creatingEwDatabase
			}
			matiasClient(matiasClientId: $matiasClientId) {
				id
				name
				hostName
				key
				accepted
			}
		}
	`,
	{
		options: (ownProps: InputProps) => {
			return {
				variables: {
					matiasClientId: ownProps.matiasClientId
				}
			};
		}
	}
);

const withUpdateControlMatiasClient = graphql<ResponseProps, InputProps>(
	gql`
		mutation updateControlMatiasState($creatingEwDatabase: Boolean) {
			updateControlMatiasState(creatingEwDatabase: $creatingEwDatabase)
				@client
		}
	`,
	{
		props: ({ mutate }) => ({
			updateState: props => {
				return mutate({
					variables: props
				});
			}
		})
	}
);

const UPDATE_MATIASCLIENT_MUTATION = gql`
	mutation UpdateMatiasClient(
		$matiasClientId: ID
		$name: String
		$accepted: Boolean
	) {
		updateMatiasClient(
			matiasClientId: $matiasClientId
			name: $name
			accepted: $accepted
		) {
			success
			matiasClient {
				id
				hostName
				accepted
			}
		}
	}
`;

const withUpdateMatiasClient = graphql<ResponseProps, InputProps>(
	UPDATE_MATIASCLIENT_MUTATION,
	{
		props: ({ mutate }) => ({
			updateMatiasClient: props => {
				return mutate({
					variables: props
				});
			}
		})
	}
);

export const ControlMatiasClient = compose(
	withMatiasClient,
	withUpdateControlMatiasClient,
	withUpdateMatiasClient
)((props: ResponseProps) => {
	if (props.data.loading) {
		return <h1>Ladataan...</h1>;
	}
	return (
		<Panel header={<h3>Hallitse matiasta</h3>}>
			<label>Isäntänimi: </label>
			{props.data.matiasClient && props.data.matiasClient.hostName}
			<FieldGroup
				label="Nimi"
				placeholder="Nimi"
				value={props.data.matiasClient && props.data.matiasClient.name}
			/>
			<label>Avain: </label>
			{props.data.matiasClient && props.data.matiasClient.key}
			<div style={{ marginBottom: "20px" }}>
				{props.data.matiasClient && props.data.matiasClient.accepted ? (
					<Button
						bsStyle="danger"
						onClick={() => {
							props.updateMatiasClient({
								matiasClientId: props.matiasClientId,
								accepted: false
							});
						}}
					>
						Hylkää{" "}
					</Button>
				) : (
					<Button
						bsStyle="success"
						onClick={() => {
							props.updateMatiasClient({
								matiasClientId: props.matiasClientId,
								accepted: true
							});
						}}
					>
						Hyväksy{" "}
					</Button>
				)}
			</div>
			<div style={{ marginBottom: "20px" }}>
				{props.data.controlMatiasClientState.creatingEwDatabase ? (
					<CreateEwDatabase
						matiasClientId={props.matiasClientId}
						onCancel={() => {
							props.updateState({
								creatingEwDatabase: false
							});
						}}
					/>
				) : (
					<Button
						bsStyle="info"
						onClick={() => {
							props.updateState({
								creatingEwDatabase: true
							});
						}}
					>
						Luo ewtietokanta
					</Button>
				)}
			</div>
			<MatiasClientEwDatabases matiasClientId={props.matiasClientId} />
		</Panel>
	);
});
