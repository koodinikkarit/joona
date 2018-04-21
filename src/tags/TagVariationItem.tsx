import * as React from "react";

import { Mutation, MutationOptions } from "react-apollo";
import { ListGroupItem } from "react-bootstrap";
import {
	ADD_TAG_TO_VARIATION,
	REMOVE_TAG_FROM_VARIATION,
	TAG_VARIATIONS_QUERY
} from "../servergql";
import {
	addTagToVariationMutation,
	addTagToVariationMutationVariables,
	removeTagFromVariationMutation,
	removeTagFromVariationMutationVariables,
	getTagVariationsQuery
} from "../types";
import { FetchResult } from "apollo-link";

export const TagVariationItem = (inputProps: {
	tagId: string;
	variationId: string;
	name: string;
	selected: boolean;
}) => (
	<Mutation
		mutation={ADD_TAG_TO_VARIATION}
		update={(cache, res: FetchResult<addTagToVariationMutation>) => {
			if (res.data.addTagToVariation) {
				const tagVariations: getTagVariationsQuery = cache.readQuery({
					query: TAG_VARIATIONS_QUERY,
					variables: {
						tagId: inputProps.tagId
					}
				});

				tagVariations.tagVariations.variations.push({
					id: inputProps.variationId,
					__typename: "Variation"
				});
				tagVariations.tagVariations.totalCount++;

				cache.writeQuery({
					query: TAG_VARIATIONS_QUERY,
					data: tagVariations,
					variables: {
						tagId: inputProps.tagId
					}
				});
			}
		}}
	>
		{(
			addTagToVariation: (
				props: MutationOptions<
					addTagToVariationMutation,
					addTagToVariationMutationVariables
				>
			) => Promise<FetchResult<addTagToVariationMutation>>
		) => (
			<Mutation
				mutation={REMOVE_TAG_FROM_VARIATION}
				update={(
					cache,
					res: FetchResult<removeTagFromVariationMutation>
				) => {
					if (res.data.removeTagFromVariation) {
						const tvs: getTagVariationsQuery = cache.readQuery({
							query: TAG_VARIATIONS_QUERY,
							variables: {
								tagId: inputProps.tagId
							}
						});

						tvs.tagVariations.variations = tvs.tagVariations.variations.filter(
							e => e.id !== inputProps.variationId
						);
						tvs.tagVariations.totalCount--;

						cache.writeQuery({
							query: TAG_VARIATIONS_QUERY,
							variables: {
								tagId: inputProps.tagId
							},
							data: tvs
						});
					}
				}}
			>
				{(
					removeTagFromVariation: (
						props: MutationOptions<
							removeTagFromVariationMutation,
							removeTagFromVariationMutationVariables
						>
					) => Promise<FetchResult<removeTagFromVariationMutation>>
				) => (
					<ListGroupItem
						bsStyle={inputProps.selected ? "success" : ""}
						onClick={() => {
							if (inputProps.selected) {
								removeTagFromVariation({
									variables: {
										tagId: inputProps.tagId,
										variationId: inputProps.variationId
									}
								});
							} else {
								addTagToVariation({
									variables: {
										tagId: inputProps.tagId,
										variationId: inputProps.variationId
									}
								});
							}
						}}
					>
						{inputProps.name}
					</ListGroupItem>
				)}
			</Mutation>
		)}
	</Mutation>
);
