import * as React from "react";

import {
	Query,
	QueryResult,
	Mutation,
	MutationOptions,
	FetchResult
} from "react-apollo";
import {
	searchTagsQuery,
	searchTagsQueryVariables,
	variationTagsQuery,
	variationTagsQueryVariables,
	addTagToVariationMutation,
	addTagToVariationMutationVariables,
	removeTagFromVariationMutation,
	removeTagFromVariationMutationVariables
} from "../types";
import {
	SEARCH_TAGS_QUERY,
	VARIATION_TAGS,
	ADD_TAG_TO_VARIATION,
	REMOVE_TAG_FROM_VARIATION
} from "../servergql";

type InputProps = {
	variationId: string;
};

export const VariationTagItem = (props: {
	checked?: boolean;
	name?: string;
	onChange?: (state: boolean) => void;
}) => {
	return (
		<div>
			<input
				type="checkbox"
				checked={props.checked}
				onChange={e => {
					if (props.onChange) {
						props.onChange(!props.checked);
					}
				}}
			/>{" "}
			{props.name}
		</div>
	);
};

export const VariationTagsResults = (inputProps: InputProps) => {
	return (
		<Mutation mutation={ADD_TAG_TO_VARIATION}>
			{(
				addTag: (
					props: MutationOptions<
						addTagToVariationMutation,
						addTagToVariationMutationVariables
					>
				) => Promise<FetchResult<addTagToVariationMutation>>
			) => (
				<Mutation mutation={REMOVE_TAG_FROM_VARIATION}>
					{(
						removeTag: (
							props: MutationOptions<
								removeTagFromVariationMutation,
								removeTagFromVariationMutationVariables
							>
						) => Promise<
							FetchResult<removeTagFromVariationMutation>
						>
					) => (
						<Query query={SEARCH_TAGS_QUERY}>
							{(
								props: QueryResult<
									searchTagsQuery,
									searchTagsQueryVariables
								>
							) => (
								<Query
									query={VARIATION_TAGS}
									variables={{
										variationId: inputProps.variationId
									}}
								>
									{(
										props2: QueryResult<
											variationTagsQuery,
											variationTagsQueryVariables
										>
									) => {
										if (props.loading || props2.loading) {
											return <div>Ladataan...</div>;
										}

										return (
											<div>
												{props.data.searchTags.tags.map(
													p => {
														return (
															<VariationTagItem
																key={p.id}
																checked={props2.data.variationTags.tags.some(
																	e =>
																		e.id ===
																		p.id
																)}
																name={p.name}
																onChange={state => {
																	if (state) {
																		addTag({
																			variables: {
																				variationId:
																					inputProps.variationId,
																				tagId:
																					p.id
																			},
																			update: (
																				cache,
																				res: FetchResult<
																					addTagToVariationMutation
																				>
																			) => {
																				if (
																					res
																						.data
																						.addTagToVariation
																				) {
																					const variationTags: variationTagsQuery = cache.readQuery(
																						{
																							query: VARIATION_TAGS,
																							variables: {
																								variationId:
																									inputProps.variationId
																							}
																						}
																					);

																					variationTags.variationTags.tags.push(
																						p
																					);
																					variationTags
																						.variationTags
																						.totalCount++;

																					cache.writeQuery(
																						{
																							query: VARIATION_TAGS,
																							variables: {
																								variationId:
																									inputProps.variationId
																							},
																							data: variationTags
																						}
																					);
																				}
																			}
																		});
																	} else {
																		removeTag(
																			{
																				variables: {
																					variationId:
																						inputProps.variationId,
																					tagId:
																						p.id
																				},
																				update: (
																					cache,
																					res: FetchResult<
																						removeTagFromVariationMutation
																					>
																				) => {
																					if (
																						res
																							.data
																							.removeTagFromVariation
																					) {
																						const variationTags: variationTagsQuery = cache.readQuery(
																							{
																								query: VARIATION_TAGS,
																								variables: {
																									variationId:
																										inputProps.variationId
																								}
																							}
																						);

																						variationTags.variationTags.tags = variationTags.variationTags.tags.filter(
																							e =>
																								e.id !==
																								p.id
																						);
																						cache.writeQuery(
																							{
																								query: VARIATION_TAGS,
																								variables: {
																									variationId:
																										inputProps.variationId
																								},
																								data: variationTags
																							}
																						);
																					}
																				}
																			}
																		);
																	}
																}}
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
					)}
				</Mutation>
			)}
		</Mutation>
	);
};
