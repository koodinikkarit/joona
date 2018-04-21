import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { Panel } from "react-bootstrap";
import { AUTHOR_QUERY } from "../servergql";
import { getAuthorQuery, getAuthorQueryVariables } from "../types";

export const AuthorInfo = (inputProps: { authorId: string }) => (
	<Panel>
		<Panel.Heading>Kirjaulijan tiedot</Panel.Heading>
		<Panel.Body>
			<Query
				query={AUTHOR_QUERY}
				variables={{
					authorId: inputProps.authorId
				}}
			>
				{(
					props: QueryResult<getAuthorQuery, getAuthorQueryVariables>
				) => {
					if (props.loading || props.error) {
						return <div />;
					}

					return props.data.author.name;
				}}
			</Query>
		</Panel.Body>
	</Panel>
);
