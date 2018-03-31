import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { SEARCH_TAGS_QUERY } from "../servergql";
import { searchTagsQuery } from "../types";
import { LinkContainer } from "react-router-bootstrap";

type InputProps = {
	searchWord?: string;
};

interface IResponseProps extends searchTagsQuery {}

export const TagsSearchResults = (inputProps: InputProps) => {
	return (
		<Query
			query={SEARCH_TAGS_QUERY}
			variables={inputProps.searchWord ? inputProps : null}
		>
			{(props: QueryResult<IResponseProps>) => (
				<div>
					<ListGroup>
						{props.data &&
							props.data.searchTags &&
							props.data.searchTags.tags.map(p => (
								<LinkContainer to={`/tag/${p.id}`} key={p.id}>
									<ListGroupItem>{p.name}</ListGroupItem>
								</LinkContainer>
							))}
					</ListGroup>
					<div>
						{!props.loading &&
							`Näytetään ${
								props.data.searchTags.tags.length
							} tulosta
							${
								props.data.searchTags.totalCount
									? props.data.searchTags.totalCount
									: props.data.searchTags.tags.length
							} tuloksesta`}
					</div>
				</div>
			)}
		</Query>
	);
};
