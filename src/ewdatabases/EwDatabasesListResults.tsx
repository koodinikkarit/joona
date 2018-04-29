import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { getEwDatabasesQuery } from "../types";
import { EW_DATABASES_QUERY } from "../servergql";
import { LinkContainer } from "react-router-bootstrap";

export const EwDatabasesListResults = () => {
	return (
		<ListGroup>
			<Query query={EW_DATABASES_QUERY}>
				{(props: QueryResult<getEwDatabasesQuery>) => {
					if (props.loading || props.error) {
						return <ListGroupItem>Ladataan...</ListGroupItem>;
					}

					return props.data.searchEwDatabases.ewDatabases.map(p => (
						<LinkContainer to={"/ewdatabase/" + p.id}>
							<ListGroupItem key={p.id}>{p.name}</ListGroupItem>
						</LinkContainer>
					));
				}}
			</Query>
		</ListGroup>
	);
};
