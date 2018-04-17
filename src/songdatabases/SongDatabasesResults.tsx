import * as React from "react";
import { Query, QueryResult } from "react-apollo";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { getSongDatabasesQuery } from "../types";
import { SONG_DATABASES_QUERY } from "../servergql/songdatabase";
import { LinkContainer } from "react-router-bootstrap";

export const SongDatabasesResults = () => {
	return (
		<div>
			<ListGroup>
				<Query query={SONG_DATABASES_QUERY}>
					{(props: QueryResult<getSongDatabasesQuery>) => {
						if (props.loading) {
							return <div>Ladataa...</div>;
						}

						if (props.error) {
							return <div>Virhe</div>;
						}

						return props.data.searchSongDatabases.songDatabases.map(
							p => (
								<LinkContainer to={"/songdatabase/" + p.id}>
									<ListGroupItem key={p.id}>
										{p.name}
									</ListGroupItem>
								</LinkContainer>
							)
						);
					}}
				</Query>
			</ListGroup>
		</div>
	);
};
