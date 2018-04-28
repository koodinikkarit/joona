import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { Panel } from "react-bootstrap";
import {
	searchTagsQuery,
	searchTagsQueryVariables,
	getSongDatabaseTagsQuery,
	getSongDatabaseTagsQueryVariables
} from "../types";
import { SEARCH_TAGS_QUERY } from "../servergql";
import { SONG_DATABASE_TAGS } from "../servergql/songdatabase";
import { SongDatabaseTagsItem } from "./SongDatabaseTagsItem";

export const SongDatabaseTags = (inputProps: { songDatabaseId: string }) => {
	return (
		<Panel>
			<Panel.Heading>Laulutietokannan tunnisteet</Panel.Heading>
			<Panel.Body>
				<div>
					<Query query={SEARCH_TAGS_QUERY}>
						{(
							props: QueryResult<
								searchTagsQuery,
								searchTagsQueryVariables
							>
						) => (
							<Query
								query={SONG_DATABASE_TAGS}
								variables={{
									songDatabaseId: inputProps.songDatabaseId
								}}
							>
								{(
									props2: QueryResult<
										getSongDatabaseTagsQuery,
										getSongDatabaseTagsQueryVariables
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

									return props.data.searchTags.tags.map(p => {
										const selected = props2.data.songDatabaseTags.tags.some(
											e => e.id === p.id
										);
										return (
											<SongDatabaseTagsItem
												key={p.id}
												selected={selected}
												name={p.name}
												songDatabaseId={
													inputProps.songDatabaseId
												}
												tagId={p.id}
											/>
										);
									});
								}}
							</Query>
						)}
					</Query>
				</div>
			</Panel.Body>
		</Panel>
	);
};
