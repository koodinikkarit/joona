import * as React from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

import { Button, Panel } from "react-bootstrap";

import { FieldGroup } from "../forms";

import {
	searchSongDatabasesQuery,
	SearchSongDatabasesQueryResponseType
} from "./";

import { SongDatabaseType } from "../types";

type UpdateCreateSongDatabaseFormContentInputProps = {
	name: string;
};

type CreateSongDatabasePcInputTypes = {
	onSuccess?: () => void;
	onCancel?: () => void;
	name?: string | number;
	createSongDatabase?: (
		{ name }: { name: string }
	) => Promise<SongDatabaseType>;
	withUpdateCreateSongDatabaseFormContent?: (
		props: UpdateCreateSongDatabaseFormContentInputProps
	) => void;
};

const CreateSongDatabasePC = (props: CreateSongDatabasePcInputTypes) => {
	return (
		<Panel header="Luo uusi laulutietokanta">
			<FieldGroup
				type="text"
				label="Nimi"
				placeholder="Nimi"
				value={props.name}
				onChange={value => {
					props.withUpdateCreateSongDatabaseFormContent({
						name: value as string
					});
				}}
			/>

			<Button
				style={{ marginRight: "10px" }}
				onClick={() => {
					if (props.onCancel) {
						props.onCancel();
					}
				}}
			>
				Peruuta
			</Button>
			<Button
				bsStyle="success"
				onClick={() => {
					props
						.createSongDatabase({
							name: props.name as string
						})
						.then(() => {
							if (props.onSuccess) {
								props.onSuccess();
							}
						});
				}}
			>
				Tallenna
			</Button>
		</Panel>
	);
};

const withCreateSongDatabaseMutation = graphql(
	gql`
		mutation createSongDatabase($name: String) {
			songDatabase: createSongDatabase(name: $name) {
				id
				name
			}
		}
	`,
	{
		props: ({ mutate }) => ({
			createSongDatabase: ({ name }: { name: string }) => {
				return mutate({
					variables: { name },
					update: (
						proxy,
						{
							data: { songDatabase }
						}: { data: { songDatabase: SongDatabaseType } }
					) => {
						const data: SearchSongDatabasesQueryResponseType = proxy.readQuery(
							{
								query: searchSongDatabasesQuery
							}
						);
						data.allSongDatabases.maxSongDatabases += 1;
						data.allSongDatabases.songDatabases.push(songDatabase);
						proxy.writeQuery({
							query: searchSongDatabasesQuery,
							data
						});
					}
				});
			}
		})
	}
);

const withUpdateCreateSongDatabaseFormContent = graphql(
	gql`
		mutation updateCreateSongDatabaseFormContent($name: String) {
			updateCreateSongDatabaseFromContent(name: $name)
		}
	`,
	{
		props: ({ mutate }) => ({
			updateCreateSongDatabaseFormContent: (
				props: UpdateCreateSongDatabaseFormContentInputProps
			) =>
				mutate({
					variables: props
				})
		})
	}
);

export const CreateSongDatabase = compose(
	withCreateSongDatabaseMutation,
	withUpdateCreateSongDatabaseFormContent
)(CreateSongDatabasePC);
