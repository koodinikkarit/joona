import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { Panel, ListGroup } from "react-bootstrap";
import { TAG_VARIATIONS_QUERY, SEARCH_VARIATIONS_QUERY } from "../servergql";

import {
	getTagVariationsQuery,
	getTagVariationsQueryVariables,
	searchVariationsQuery,
	searchVariationsQueryVariables
} from "../types";
import { TagVariationItem } from ".";

export const TagVariations = (inputProps: { tagId: string }) => {
	return (
		<Panel>
			<Panel.Heading>Tunnisteen laulut</Panel.Heading>
			<Panel.Body>
				<Query query={SEARCH_VARIATIONS_QUERY}>
					{(
						props2: QueryResult<
							searchVariationsQuery,
							searchVariationsQueryVariables
						>
					) => (
						<Query
							query={TAG_VARIATIONS_QUERY}
							variables={{
								tagId: inputProps.tagId
							}}
						>
							{(
								props: QueryResult<
									getTagVariationsQuery,
									getTagVariationsQueryVariables
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
										<ListGroup>
											{props2.data.searchVariations.variations.map(
												p => {
													const selected = props.data.tagVariations.variations.some(
														e => e.id === p.id
													);

													return (
														<TagVariationItem
															key={p.id}
															name={p.name}
															selected={selected}
															tagId={
																inputProps.tagId
															}
															variationId={p.id}
														/>
													);
												}
											)}
										</ListGroup>
										Näytetään{" "}
										{
											props2.data.searchVariations
												.variations.length
										}{" "}
										laulua{" "}
										{
											props2.data.searchVariations
												.totalCount
										}{" "}
										laulusta
									</div>
								);
							}}
						</Query>
					)}
				</Query>
			</Panel.Body>
		</Panel>
	);
};
