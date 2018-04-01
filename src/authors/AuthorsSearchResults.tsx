import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { searchAuthorsQuery } from "../types";
import { AUTHORS_SEARCH_QUERY } from "../servergql";
import { LinkContainer } from "react-router-bootstrap";

type InputProps = {
	searchWord?: string;
};

interface IResponseProps extends searchAuthorsQuery {}

export const AuthorsSearchResults = (inputProps: InputProps) => {
	return (
		<Query query={AUTHORS_SEARCH_QUERY}>
			{(props: QueryResult<IResponseProps>) => (
				<div>
					<ListGroup>
						{props.data &&
							props.data.searchAuthors &&
							props.data.searchAuthors.authors.map(p => (
								<LinkContainer
									to={`/author/${p.id}`}
									key={p.id}
								>
									<ListGroupItem>{p.name}</ListGroupItem>
								</LinkContainer>
							))}
					</ListGroup>
					{/* <div>
				{!props.loading &&
					`Näytetään ${
						props.data.searchLanguages.languages.length
					} tulosta
							${
								props.data.searchLanguages.totalCount
									? props.data.searchLanguages.totalCount
									: props.data.searchLanguages.languages
											.length
							} tuloksesta`}
			</div> */}
				</div>
			)}
		</Query>
	);
};
