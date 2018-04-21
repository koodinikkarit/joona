import * as React from "react";

import {
	Query,
	QueryResult,
	Mutation,
	MutationOptions,
	FetchResult
} from "react-apollo";

import { Panel, FormControl } from "react-bootstrap";
import {
	searchLanguagesQuery,
	searchLanguagesQueryVariables,
	updateVariationMutation,
	updateVariationMutationVariables,
	getVariationQuery,
	getVariationQueryVariables
} from "../types";
import {
	SEARCH_LANGUAGES_QUERY,
	UPDATE_VARIATION_MUTATION,
	VARIATION_QUERY
} from "../servergql";

export const VariationLanguage = (inputProps: { variationId: string }) => {
	return (
		<Panel>
			<Panel.Heading>Laulun kieli</Panel.Heading>
			<Panel.Body>
				<Query
					query={VARIATION_QUERY}
					variables={{
						variationId: inputProps.variationId
					}}
				>
					{(
						props2: QueryResult<
							getVariationQuery,
							getVariationQueryVariables
						>
					) => {
						if (props2.loading || props2.error) {
							return <div />;
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
										value={props2.data.variation.languageId}
										onChange={e => {
											const target = e.target as HTMLInputElement;
											updateVariation({
												variables: {
													params: {
														variationId:
															inputProps.variationId,
														languageId: target.value
													}
												}
											});
										}}
									>
										<option value="">Valitse</option>
										<Query query={SEARCH_LANGUAGES_QUERY}>
											{(
												props: QueryResult<
													searchLanguagesQuery,
													searchLanguagesQueryVariables
												>
											) => {
												if (
													props.loading ||
													props.error
												) {
													return <option />;
												}

												return props.data.searchLanguages.languages.map(
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
};
