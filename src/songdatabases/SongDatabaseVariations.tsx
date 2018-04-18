import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import { SONG_DATABASE_VARIATIONS_QUERY } from "../servergql/songdatabase";

import {
	getSongDatabaseVariationsQuery,
	getSongDatabaseVariationsQueryVariables
} from "../types";

export const SongDatabaseVariations = (inputProps: {
	songDatabaseId: string;
}) => {
	return (
		<Panel>
			<Panel.Heading>Laulutietokannan laulut</Panel.Heading>
			<Panel.Body>
				<Query
					query={SONG_DATABASE_VARIATIONS_QUERY}
					variables={{ songDatabaseId: inputProps.songDatabaseId }}
				>
					{(
						props: QueryResult<
							getSongDatabaseVariationsQuery,
							getSongDatabaseVariationsQueryVariables
						>
					) => {
						if (props.loading || props.error) {
							return <div />;
						}

						return (
							<ListGroup>
								{props.data.songDatabaseVariations.variations.map(
									p => (
										<ListGroupItem key={p.id}>
											{p.name}
										</ListGroupItem>
									)
								)}
							</ListGroup>
						);
					}}
				</Query>
			</Panel.Body>
		</Panel>
	);
};
