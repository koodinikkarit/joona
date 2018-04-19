import * as React from "react";

import {
	Query,
	QueryResult,
	Mutation,
	MutationOptions,
	FetchResult
} from "react-apollo";

import {
	getSongDatabaseVariationsDataQuery,
	getSongDatabaseVariationsDataQueryVariables,
	addVariationToSongDatabaseMutation,
	addVariationToSongDatabaseMutationVariables,
	removeVariationFromSongDatabaseMutation,
	removeVariationFromSongDatabaseMutationVariables
} from "../types";
import {
	SONG_DATABASE_VARIATIONS_QUERY,
	ADD_VARIATION_TO_SONG_DATABASE_MUTATION,
	REMOVE_VARIATION_FROM_SONG_DATABASE_MUTATION
} from "../servergql/songdatabase";
import { ListGroupItem } from "react-bootstrap";

export const SongDatabaseVariationsResults = (inputProps: {
	songDatabaseId: string;
	searchWord?: string;
}) => {
	return (
		<Query
			query={SONG_DATABASE_VARIATIONS_QUERY}
			variables={{
				songDatabaseId: inputProps.songDatabaseId,
				searchWord: inputProps.searchWord
			}}
		>
			{(
				props: QueryResult<
					getSongDatabaseVariationsDataQuery,
					getSongDatabaseVariationsDataQueryVariables
				>
			) => {
				if (props.loading || props.error) {
					return <div />;
				}

				return (
					<Mutation
						mutation={ADD_VARIATION_TO_SONG_DATABASE_MUTATION}
					>
						{(
							addVariationToSongDatabase: (
								props: MutationOptions<
									addVariationToSongDatabaseMutation,
									addVariationToSongDatabaseMutationVariables
								>
							) => Promise<
								FetchResult<addVariationToSongDatabaseMutation>
							>
						) => (
							<Mutation
								mutation={
									REMOVE_VARIATION_FROM_SONG_DATABASE_MUTATION
								}
							>
								{(
									removeVariationFromSongDatabase: (
										props: MutationOptions<
											removeVariationFromSongDatabaseMutation,
											removeVariationFromSongDatabaseMutationVariables
										>
									) => Promise<
										FetchResult<
											removeVariationFromSongDatabaseMutation
										>
									>
								) =>
									props.data.searchVariations.variations.map(
										p => {
											const selected = props.data.songDatabaseVariations.variations.some(
												e => e.id === p.id
											);

											return (
												<ListGroupItem
													key={p.id}
													bsStyle={
														selected
															? "success"
															: ""
													}
													onClick={() => {
														if (selected) {
															removeVariationFromSongDatabase(
																{
																	variables: {
																		variationId:
																			p.id,
																		songDatabaseId:
																			inputProps.songDatabaseId
																	},
																	update: (
																		cache,
																		res: FetchResult<
																			removeVariationFromSongDatabaseMutation
																		>
																	) => {
																		if (
																			res
																				.data
																				.removeVariationFromSongDatabase
																		) {
																			const sdv: getSongDatabaseVariationsDataQuery = cache.readQuery(
																				{
																					query: SONG_DATABASE_VARIATIONS_QUERY,
																					variables: {
																						songDatabaseId:
																							inputProps.songDatabaseId,
																						searchWord:
																							inputProps.searchWord
																					}
																				}
																			);

																			sdv.songDatabaseVariations.variations = sdv.songDatabaseVariations.variations.filter(
																				e =>
																					e.id !==
																					p.id
																			);
																			sdv
																				.songDatabaseVariations
																				.totalCount--;

																			cache.writeQuery(
																				{
																					data: sdv,
																					query: SONG_DATABASE_VARIATIONS_QUERY,
																					variables: {
																						songDatabaseId:
																							inputProps.songDatabaseId,
																						searchWord:
																							inputProps.searchWord
																					}
																				}
																			);
																		}
																	}
																}
															);
														} else {
															addVariationToSongDatabase(
																{
																	variables: {
																		variationId:
																			p.id,
																		songDatabaseId:
																			inputProps.songDatabaseId
																	},
																	update: (
																		cache,
																		res: FetchResult<
																			addVariationToSongDatabaseMutation
																		>
																	) => {
																		if (
																			res
																				.data
																				.addVariationToSongDatabase
																		) {
																			const sdv: getSongDatabaseVariationsDataQuery = cache.readQuery(
																				{
																					query: SONG_DATABASE_VARIATIONS_QUERY,
																					variables: {
																						songDatabaseId:
																							inputProps.songDatabaseId,
																						searchWord:
																							inputProps.searchWord
																					}
																				}
																			);

																			sdv.songDatabaseVariations.variations.push(
																				{
																					id:
																						p.id,
																					__typename:
																						"Variation"
																				}
																			);
																			sdv
																				.songDatabaseVariations
																				.totalCount++;

																			cache.writeQuery(
																				{
																					data: sdv,
																					query: SONG_DATABASE_VARIATIONS_QUERY,
																					variables: {
																						songDatabaseId:
																							inputProps.songDatabaseId,
																						searchWord:
																							inputProps.searchWord
																					}
																				}
																			);
																		}
																	}
																}
															);
														}
													}}
												>
													{p.name}
												</ListGroupItem>
											);
										}
									)
								}
							</Mutation>
						)}
					</Mutation>
				);
			}}
		</Query>
	);
};
