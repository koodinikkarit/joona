import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { COPYRIGHT_SEARCH_QUERY } from "../servergql";
import { searchCopyrightsQuery } from "../types";
import { LinkContainer } from "react-router-bootstrap";

interface IResponseProps extends searchCopyrightsQuery {}

export const CopyrightSearchResults = () => {
	return (
		<Query query={COPYRIGHT_SEARCH_QUERY}>
			{(props: QueryResult<IResponseProps>) => (
				<ListGroup>
					{props.data &&
						props.data.searchCopyrights &&
						props.data.searchCopyrights.copyrights.map(p => (
							<LinkContainer to={`/copyright/${p.id}`} key={p.id}>
								<ListGroupItem>{p.name}</ListGroupItem>
							</LinkContainer>
						))}
				</ListGroup>
			)}
		</Query>
	);
};
