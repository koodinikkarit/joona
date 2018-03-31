import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { SEARCH_LANGUAGES_QUERY } from "../servergql";
import { searchLanguagesQuery } from "../types";
import { LinkContainer } from "react-router-bootstrap";

interface IResponseProps extends searchLanguagesQuery {}

type InputProps = {
	searchWord?: string;
};

export const LanguagesSearchResults = (inputProps: InputProps) => {
	return (
		<Query
			query={SEARCH_LANGUAGES_QUERY}
			variables={inputProps.searchWord ? inputProps : null}
		>
			{(props: QueryResult<IResponseProps>) => (
				<div>
					<ListGroup>
						{props.data &&
							props.data.searchLanguages &&
							props.data.searchLanguages.languages.map(p => (
								<LinkContainer
									to={`/language/${p.id}`}
									key={p.id}
								>
									<ListGroupItem>{p.name}</ListGroupItem>
								</LinkContainer>
							))}
					</ListGroup>
					<div>
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
					</div>
				</div>
			)}
		</Query>
	);
};
