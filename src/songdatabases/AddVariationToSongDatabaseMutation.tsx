import * as React from "react";
import { Mutation, MutationOptions, FetchResult } from "react-apollo";
import {
	ADD_VARIATION_TO_SONG_DATABASE_MUTATION,
	SONG_DATABASE_VARIATIONS_QUERY
} from "../servergql/songdatabase";
import {
	addVariationToSongDatabaseMutation,
	addVariationToSongDatabaseMutationVariables,
	getSongDatabaseVariationsDataQuery
} from "../types";

export const AddVariationToSongDatabaseMutation = (inputProps: {
	children: (
		addVariationToSongDatabase: (
			variationId: string,
			songDatabaseId: string
		) => void
	) => React.ReactNode;
	searchWord?: string;
}) => (
	<Mutation mutation={ADD_VARIATION_TO_SONG_DATABASE_MUTATION}>
		{(
			addVariationToSongDatabase: (
				args: MutationOptions<
					addVariationToSongDatabaseMutation,
					addVariationToSongDatabaseMutationVariables
				>
			) => Promise<FetchResult<addVariationToSongDatabaseMutation>>
		) => {
			return inputProps.children(
				(variationId: string, songDatabaseId: string) => {
					addVariationToSongDatabase({
						variables: {
							variationId,
							songDatabaseId
						},
						update: (
							cache,
							res: FetchResult<addVariationToSongDatabaseMutation>
						) => {
							if (res.data.addVariationToSongDatabase) {
								const sdv: getSongDatabaseVariationsDataQuery = cache.readQuery(
									{
										query: SONG_DATABASE_VARIATIONS_QUERY,
										variables: {
											songDatabaseId: songDatabaseId,
											searchWord: inputProps.searchWord
										}
									}
								);

								sdv.songDatabaseVariations.variations.push({
									id: variationId,
									__typename: "Variation"
								});
								sdv.songDatabaseVariations.totalCount++;

								cache.writeQuery({
									data: sdv,
									query: SONG_DATABASE_VARIATIONS_QUERY,
									variables: {
										songDatabaseId: songDatabaseId,
										searchWord: inputProps.searchWord
									}
								});
							}
						}
					});
				}
			);
		}}
	</Mutation>
);
