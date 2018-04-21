import * as React from "react";

import { Query, QueryResult } from "react-apollo";
import {
	getLanguageVariationsQuery,
	getLanguageVariationsQueryVariables,
	searchVariationsQuery,
	searchVariationsQueryVariables
} from "../types";
import {
	LANGUAGE_VARIATIONS_QUERY,
	SEARCH_VARIATIONS_QUERY
} from "../servergql";
import { Panel, ListGroup } from "react-bootstrap";
import { LanaugeVariationItem } from ".";

export const LanguageVariations = (inputProps: { languageId: string }) => {
	return (
		<Panel>
			<Panel.Heading>Laulut kielellä</Panel.Heading>
			<Panel.Body>
				<Query query={SEARCH_VARIATIONS_QUERY}>
					{(
						props2: QueryResult<
							searchVariationsQuery,
							searchVariationsQueryVariables
						>
					) => (
						<Query
							query={LANGUAGE_VARIATIONS_QUERY}
							variables={{
								languageId: inputProps.languageId
							}}
						>
							{(
								props: QueryResult<
									getLanguageVariationsQuery,
									getLanguageVariationsQueryVariables
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
													const selected = props.data.languageVariations.variations.some(
														e => p.id === e.id
													);

													return (
														<LanaugeVariationItem
															key={p.id}
															name={p.name}
															variationId={p.id}
															languageId={
																inputProps.languageId
															}
															selected={selected}
														/>
													);
												}
											)}
										</ListGroup>
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
