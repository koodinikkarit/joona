import * as React from "react";

import {
	Query,
	QueryResult,
	Mutation,
	MutationOptions,
	FetchResult
} from "react-apollo";

import { Panel } from "react-bootstrap";
import {
	getVariationSongDatabasesQuery,
	getVariationSongDatabasesQueryVariables,
	getSongDatabasesQuery,
	addVariationToSongDatabaseMutation,
	addVariationToSongDatabaseMutationVariables,
	removeVariationFromSongDatabaseMutationVariables,
	removeVariationFromSongDatabaseMutation
} from "../types";
import { VARIATION_SONG_DATABASES_QUERY } from "../servergql";
import {
	SONG_DATABASES_QUERY,
	ADD_VARIATION_TO_SONG_DATABASE_MUTATION,
	REMOVE_VARIATION_FROM_SONG_DATABASE_MUTATION
} from "../servergql/songdatabase";

export const VariationSongDatabases = (inputProps: { variationId: string }) => {
	return (
		<Panel>
			<Panel.Heading>Tietokannat joissa laulu on</Panel.Heading>
			<Panel.Body>
				<Query query={SONG_DATABASES_QUERY}>
					{(props2: QueryResult<getSongDatabasesQuery>) => (
						<Query
							query={VARIATION_SONG_DATABASES_QUERY}
							variables={{
								variationId: inputProps.variationId
							}}
						>
							{(
								props: QueryResult<
									getVariationSongDatabasesQuery,
									getVariationSongDatabasesQueryVariables
								>
							) => {
								if (
									props.loading ||
									props.error ||
									props2.loading ||
									props2.error
								) {
									return <div />;
								}

								return (
									<Mutation
										mutation={
											ADD_VARIATION_TO_SONG_DATABASE_MUTATION
										}
									>
										{(
											addVariationToSongDatabase: (
												props: MutationOptions<
													addVariationToSongDatabaseMutation,
													addVariationToSongDatabaseMutationVariables
												>
											) => Promise<
												FetchResult<
													addVariationToSongDatabaseMutation
												>
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
												) => (
													<div>
														{props2.data.searchSongDatabases.songDatabases.map(
															p => {
																const selected = props.data.variationSongDatabases.songDatabases.some(
																	e =>
																		e.id ===
																		p.id
																);
																return (
																	<div
																		key={
																			p.id
																		}
																	>
																		<input
																			type="checkbox"
																			checked={
																				selected
																			}
																			onClick={() => {
																				if (
																					selected
																				) {
																					removeVariationFromSongDatabase(
																						{
																							variables: {
																								songDatabaseId:
																									p.id,
																								variationId:
																									inputProps.variationId
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
																									const variationSongDatabases: getVariationSongDatabasesQuery = cache.readQuery(
																										{
																											query: VARIATION_SONG_DATABASES_QUERY,
																											variables: {
																												variationId:
																													inputProps.variationId
																											}
																										}
																									);

																									const c =
																										variationSongDatabases.variationSongDatabases;

																									c.songDatabases = c.songDatabases.filter(
																										e =>
																											e.id !==
																											p.id
																									);

																									cache.writeQuery(
																										{
																											query: VARIATION_SONG_DATABASES_QUERY,
																											data: variationSongDatabases,
																											variables: {
																												variationId:
																													inputProps.variationId
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
																								songDatabaseId:
																									p.id,
																								variationId:
																									inputProps.variationId
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
																									const variationSongDatabases: getVariationSongDatabasesQuery = cache.readQuery(
																										{
																											query: VARIATION_SONG_DATABASES_QUERY,
																											variables: {
																												variationId:
																													inputProps.variationId
																											}
																										}
																									);

																									variationSongDatabases.variationSongDatabases.songDatabases.push(
																										p
																									);

																									cache.writeQuery(
																										{
																											query: VARIATION_SONG_DATABASES_QUERY,
																											data: variationSongDatabases,
																											variables: {
																												variationId:
																													inputProps.variationId
																											}
																										}
																									);
																								}
																							}
																						}
																					);
																				}
																			}}
																		/>
																		{" " +
																			p.name}
																	</div>
																);
															}
														)}
													</div>
												)}
											</Mutation>
										)}
									</Mutation>
								);
							}}
						</Query>
					)}
				</Query>
			</Panel.Body>
		</Panel>
	);
};
