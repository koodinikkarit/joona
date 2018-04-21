import * as React from "react";

import {
	Query,
	QueryResult,
	Mutation,
	MutationOptions,
	FetchResult
} from "react-apollo";
import {
	getVariationQuery,
	getVariationQueryVariables,
	updateVariationMutation,
	updateVariationMutationVariables,
	searchAuthorsQueryVariables,
	searchAuthorsQuery
} from "../types";
import {
	VARIATION_QUERY,
	UPDATE_VARIATION_MUTATION,
	AUTHORS_SEARCH_QUERY
} from "../servergql";
import { Panel, FormControl } from "react-bootstrap";

export const VariationAuthor = (inputProps: { variationId: string }) => (
	<Panel>
		<Panel.Heading>Laulun kirjailija</Panel.Heading>
		<Panel.Body>
			<Query
				query={VARIATION_QUERY}
				variables={{
					variationId: inputProps.variationId
				}}
			>
				{(
					props: QueryResult<
						getVariationQuery,
						getVariationQueryVariables
					>
				) => {
					if (props.loading) {
						return <div>Ladataan...</div>;
					}

					return (
						<Mutation mutation={UPDATE_VARIATION_MUTATION}>
							{(
								updateVariation: (
									props: MutationOptions<
										updateVariationMutation,
										updateVariationMutationVariables
									>
								) => Promise<
									FetchResult<updateVariationMutation>
								>
							) => (
								<FormControl
									componentClass="select"
									placeholder="select"
									value={props.data.variation.authorId}
									onChange={e => {
										const target = e.target as HTMLInputElement;
										updateVariation({
											variables: {
												params: {
													variationId:
														inputProps.variationId,
													authorId: target.value
												}
											}
										});
									}}
								>
									<option value="">Valitse</option>
									<Query query={AUTHORS_SEARCH_QUERY}>
										{(
											props2: QueryResult<
												searchAuthorsQuery,
												searchAuthorsQueryVariables
											>
										) => {
											if (
												props2.loading ||
												props2.error
											) {
												return <option />;
											}

											return props2.data.searchAuthors.authors.map(
												p => (
													<option
														key={p.id}
														value={p.id}
													>
														{p.name}
													</option>
												)
											);
										}}
									</Query>
								</FormControl>
							)}
						</Mutation>
					);
				}}
			</Query>
		</Panel.Body>
	</Panel>
);
