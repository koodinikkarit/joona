import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { Panel } from "react-bootstrap";
import { TAG_QUERY } from "../servergql";
import { getTagQuery, getTagQueryVariables } from "../types";

export const TagInfo = (inputProps: { tagId: string }) => {
	return (
		<Panel>
			<Panel.Heading>Tunnisteen tiedot</Panel.Heading>
			<Panel.Body>
				<Query
					query={TAG_QUERY}
					variables={{
						tagId: inputProps.tagId
					}}
				>
					{(
						props: QueryResult<getTagQuery, getTagQueryVariables>
					) => {
						if (props.loading || props.error) {
							return <div />;
						}

						return props.data.tag.name;
					}}
				</Query>
			</Panel.Body>
		</Panel>
	);
};
