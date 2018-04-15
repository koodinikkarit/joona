import * as React from "react";

import { Query, QueryResult } from "react-apollo";
import { getVariationQuery, getVariationQueryVariables } from "../types";
import { VARIATION_QUERY } from "../servergql";
import { Panel } from "react-bootstrap";

export const VariationAuthor = (inputProps: { variationId: string }) => (
	<Query
		query={VARIATION_QUERY}
		variables={{
			variationId: inputProps.variationId
		}}
	>
		{(
			props: QueryResult<getVariationQuery, getVariationQueryVariables>
		) => {
			if (props.loading) {
				return <div>Ladataan...</div>;
			}

			return (
				<Panel>
					<Panel.Heading>Kirjailija</Panel.Heading>
					<Panel.Body>
						{props.data.variation.author ? (
							<div>{props.data.variation.author.name}</div>
						) : (
							"Ei kiinitetty kirjailijaa"
						)}
					</Panel.Body>
				</Panel>
			);
		}}
	</Query>
);
