import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { Panel } from "react-bootstrap";
import { EW_DATABASE_QUERY } from "../servergql";
import { getEwDatabaseQuery, getEwDatabaseQueryVariables } from "../types";

export const EwDatabaseInfo = (inputProps: { ewDatabaseId: string }) => {
	return (
		<Panel>
			<Panel.Heading>Ewlaulutietokannan tiedot</Panel.Heading>
			<Panel.Body>
				<Query
					query={EW_DATABASE_QUERY}
					variables={{
						ewDatabaseId: inputProps.ewDatabaseId
					}}
				>
					{(
						props: QueryResult<
							getEwDatabaseQuery,
							getEwDatabaseQueryVariables
						>
					) => {
						if (props.loading || props.error) {
							return <div />;
						}

						return props.data.ewDatabase.name;
					}}
				</Query>
			</Panel.Body>
		</Panel>
	);
};
