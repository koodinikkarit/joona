import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { Panel } from "react-bootstrap";
import {
	searchVariationsQuery,
	searchVariationsQueryVariables,
	getAuthorVariationsQuery,
	getAuthorVariationsQueryVariables
} from "../types";
import { SEARCH_VARIATIONS_QUERY, AUTHOR_VARIATIONS_QUERY } from "../servergql";
import { AuthorVariationItem } from "./AuthorVariationItem";

export const AuthorVariations = (inputProps: { authorId: string }) => (
	<Panel>
		<Panel.Heading>Kirjailijan laulut</Panel.Heading>
		<Panel.Body>
			<Query query={SEARCH_VARIATIONS_QUERY}>
				{(
					props: QueryResult<
						searchVariationsQuery,
						searchVariationsQueryVariables
					>
				) => (
					<Query
						query={AUTHOR_VARIATIONS_QUERY}
						variables={{
							authorId: inputProps.authorId
						}}
					>
						{(
							props2: QueryResult<
								getAuthorVariationsQuery,
								getAuthorVariationsQueryVariables
							>
						) => {
							if (
								props.loading ||
								props.error ||
								props2.loading ||
								props2.error
							) {
								return <div />;
							}

							return (
								<div>
									{props.data.searchVariations.variations.map(
										p => {
											const selected = props2.data.authorVariations.variations.some(
												e => e.id === p.id
											);

											return (
												<AuthorVariationItem
													key={p.id}
													name={p.name}
													selected={selected}
												/>
											);
										}
									)}
								</div>
							);
						}}
					</Query>
				)}
			</Query>
		</Panel.Body>
	</Panel>
);
