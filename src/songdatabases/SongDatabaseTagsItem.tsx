import * as React from "react";

import { Mutation, MutationOptions, FetchResult } from "react-apollo";
import {
	ADD_TAG_TO_SONG_DATABASE,
	REMOVE_TAG_FROM_SONG_DATABASE,
	SONG_DATABASE_TAGS
} from "../servergql/songdatabase";
import {
	addTagToSongDatabaseMutation,
	addTagToSongDatabaseMutationVariables,
	removeTagFromSongDatabaseMutationVariables,
	removeTagFromSongDatabaseMutation,
	getSongDatabaseTagsQuery
} from "../types";

export const SongDatabaseTagsItem = (inputProps: {
	selected: boolean;
	name: string;
	songDatabaseId: string;
	tagId: string;
}) => {
	return (
		<Mutation
			mutation={ADD_TAG_TO_SONG_DATABASE}
			update={(cache, res: FetchResult<addTagToSongDatabaseMutation>) => {
				if (res.data.addTagToSongDatabase) {
					const t: getSongDatabaseTagsQuery = cache.readQuery({
						query: SONG_DATABASE_TAGS,
						variables: {
							songDatabaseId: inputProps.songDatabaseId
						}
					});

					t.songDatabaseTags.tags.push({
						id: inputProps.tagId,
						__typename: "Tag"
					});
					t.songDatabaseTags.totalCount++;

					cache.writeQuery({
						query: SONG_DATABASE_TAGS,
						data: t,
						variables: {
							songDatabaseId: inputProps.songDatabaseId
						}
					});
				}
			}}
		>
			{(
				addTagToSongDatabase: (
					props: MutationOptions<
						addTagToSongDatabaseMutation,
						addTagToSongDatabaseMutationVariables
					>
				) => Promise<FetchResult<addTagToSongDatabaseMutation>>
			) => (
				<Mutation
					mutation={REMOVE_TAG_FROM_SONG_DATABASE}
					update={(
						cache,
						res: FetchResult<removeTagFromSongDatabaseMutation>
					) => {
						if (res.data.removeTagFromSongDatabase) {
							const t: getSongDatabaseTagsQuery = cache.readQuery(
								{
									query: SONG_DATABASE_TAGS,
									variables: {
										songDatabaseId:
											inputProps.songDatabaseId
									}
								}
							);

							t.songDatabaseTags.tags = t.songDatabaseTags.tags.filter(
								e => e.id !== inputProps.tagId
							);
							t.songDatabaseTags.totalCount--;

							cache.writeQuery({
								query: SONG_DATABASE_TAGS,
								data: t,
								variables: {
									songDatabaseId: inputProps.songDatabaseId
								}
							});
						}
					}}
				>
					{(
						removeTagFromSongDatabase: (
							props: MutationOptions<
								removeTagFromSongDatabaseMutation,
								removeTagFromSongDatabaseMutationVariables
							>
						) => Promise<
							FetchResult<removeTagFromSongDatabaseMutation>
						>
					) => (
						<div>
							<input
								type="checkbox"
								checked={inputProps.selected}
								onClick={() => {
									if (inputProps.selected) {
										removeTagFromSongDatabase({
											variables: {
												songDatabaseId:
													inputProps.songDatabaseId,
												tagId: inputProps.tagId
											}
										});
									} else {
										addTagToSongDatabase({
											variables: {
												songDatabaseId:
													inputProps.songDatabaseId,
												tagId: inputProps.tagId
											}
										});
									}
								}}
							/>{" "}
							{inputProps.name}
						</div>
					)}
				</Mutation>
			)}
		</Mutation>
	);
};
