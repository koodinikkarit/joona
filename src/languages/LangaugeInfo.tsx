import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { Panel } from "react-bootstrap";
import { LANGUAGE_QUERY } from "../servergql";

import { getLanguageQuery, getLanguageQueryVariables } from "../types";

export const LanguageInfo = (inputProps: { languageId: string }) => {
	return (
		<Panel>
			<Panel.Heading>Kielen tiedot</Panel.Heading>
			<Panel.Body>
				<Query
					query={LANGUAGE_QUERY}
					variables={{
						languageId: inputProps.languageId
					}}
				>
					{(
						props: QueryResult<
							getLanguageQuery,
							getLanguageQueryVariables
						>
					) => {
						if (props.loading || props.error) {
							return <div />;
						}

						return props.data.language.name;
					}}
				</Query>
			</Panel.Body>
		</Panel>
	);
};
