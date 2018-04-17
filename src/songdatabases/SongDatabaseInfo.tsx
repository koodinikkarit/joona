import * as React from "react";
import { Query, QueryResult } from "react-apollo";

import { Panel } from "react-bootstrap";
import { SONG_DATABASE_QUERY } from "../servergql/songdatabase";
import { getSongDatabaseQueryVariables, getSongDatabaseQuery } from "../types";

export const SongDatabaseInfo = (inputProps: { songDatabaseId: string }) => {
	return (
		<Panel>
			<Panel.Heading>Laulutietokannan tiedot</Panel.Heading>
			<Panel.Body>
				<Query
					query={SONG_DATABASE_QUERY}
					variables={{ songDatabaseId: inputProps.songDatabaseId }}
				>
					{(
						props: QueryResult<
							getSongDatabaseQuery,
							getSongDatabaseQueryVariables
						>
					) => {
						if (props.loading) {
							return <div />;
						}

						if (props.error) {
							return <div />;
						}

						return props.data.songDatabase.name;
					}}
				</Query>
			</Panel.Body>
		</Panel>
	);
};
