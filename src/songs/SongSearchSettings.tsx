import * as React from "react";
import gql from "graphql-tag";

import { Mutation, MutationOptions, Query, QueryResult } from "react-apollo";

import { Panel, ControlLabel } from "react-bootstrap";
import { SONGS_SEARCH_WORD_QUERY } from "../stategql";
import { TextInput } from "../common";

export const CHANGE_SONGS_SEARCH_WORD = gql`
	mutation changeSongsSearchWord($searchWord: String) {
		changeSongsSearchWord(searchWord: $searchWord) @client
	}
`;

export const SongSearchSettings = () => (
	<Panel>
		<Panel.Heading>Lauluhakuasetukset</Panel.Heading>
		<Panel.Body>
			<ControlLabel>Hakusana</ControlLabel>
			<Mutation mutation={CHANGE_SONGS_SEARCH_WORD}>
				{(
					changeSongsSearchWord: (
						props: MutationOptions<
							{},
							{
								searchWord: string;
							}
						>
					) => void
				) => (
					<Query query={SONGS_SEARCH_WORD_QUERY}>
						{(
							props2: QueryResult<{
								songsSearchWord: string;
							}>
						) => {
							if (props2.loading) {
								return <div />;
							}

							return (
								<TextInput
									placeholder="Hakusana"
									value={props2.data.songsSearchWord}
									delay={300}
									onChange={value => {
										changeSongsSearchWord({
											variables: {
												searchWord: value
											}
										});
									}}
								/>
							);
						}}
					</Query>
				)}
			</Mutation>
		</Panel.Body>
	</Panel>
);
