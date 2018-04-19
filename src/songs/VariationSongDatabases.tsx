import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { Panel } from "react-bootstrap";
import {
	getVariationSongDatabasesQuery,
	getVariationSongDatabasesQueryVariables,
	getSongDatabasesQuery
} from "../types";
import { VARIATION_SONG_DATABASES_QUERY } from "../servergql";
import { SONG_DATABASES_QUERY } from "../servergql/songdatabase";

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
									<div>
										{props2.data.searchSongDatabases.songDatabases.map(
											p => {
												const selected = props.data.variationSongDatabases.songDatabases.some(
													e => e.id === p.id
												);
												return (
													<div key={p.id}>
														<input
															type="checkbox"
															checked={selected}
														/>
														{" " + p.name}
													</div>
												);
											}
										)}
									</div>
								);
							}}
						</Query>
					)}
				</Query>
			</Panel.Body>
		</Panel>
	);
};
