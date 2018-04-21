import * as React from "react";
import { Mutation, MutationOptions, FetchResult } from "react-apollo";
import {
	REMOVE_VARIATION_FROM_SONG_DATABASE_MUTATION,
	SONG_DATABASE_VARIATIONS_QUERY
} from "../servergql/songdatabase";
import {
	removeVariationFromSongDatabaseMutation,
	removeVariationFromSongDatabaseMutationVariables,
	getSongDatabaseVariationsDataQuery
} from "../types";

export const RemoveVariationFromSongDatabaseMutation = (inputProps: {
	children: (
		removeVariationFromSongDatabase: (
			variationId: string,
			songDatabaseId: string
		) => void
	) => React.ReactNode;
	searchWord?: string;
}) => (
	<Mutation mutation={REMOVE_VARIATION_FROM_SONG_DATABASE_MUTATION}>
		{(
			removeVariationFromSongDatabase: (
				props: MutationOptions<
					removeVariationFromSongDatabaseMutation,
					removeVariationFromSongDatabaseMutationVariables
				>
			) => Promise<FetchResult<removeVariationFromSongDatabaseMutation>>
		) => {
			return inputProps.children(
				(variationId: string, songDatabaseId: string) => {
					removeVariationFromSongDatabase({
						variables: {
							variationId: variationId,
							songDatabaseId: songDatabaseId
						},
						update: (
							cache,
							res: FetchResult<
								removeVariationFromSongDatabaseMutation
							>
						) => {
							if (res.data.removeVariationFromSongDatabase) {
								const sdv: getSongDatabaseVariationsDataQuery = cache.readQuery(
									{
										query: SONG_DATABASE_VARIATIONS_QUERY,
										variables: {
											songDatabaseId: songDatabaseId,
											searchWord: inputProps.searchWord
										}
									}
								);

								sdv.songDatabaseVariations.variations = sdv.songDatabaseVariations.variations.filter(
									e => e.id !== variationId
								);
								sdv.songDatabaseVariations.totalCount--;

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
