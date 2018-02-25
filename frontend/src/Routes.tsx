import * as React from "react";
import { Route } from "react-router-dom";

import {
	SongDatabasesPage,
	SongDatabasePage,
	MatiasClientPage,
	MatiasClientsPage,
	SongsPage,
	LoginPage,
	RegisterPage
} from "./pages";
import { graphql, ChildProps } from "react-apollo";
import { PAGE_VIEWER_QUERY } from "./servergql";
import { getPageViewerQuery } from "./types";

const withViewer = graphql(PAGE_VIEWER_QUERY);

export const Routes = withViewer(
	(props: ChildProps<{}, getPageViewerQuery>) => {
		if (props.data.loading) {
			return <div />;
		}

		if (props.data.error) {
			return <div />;
		}

		if (!props.data.viewer.adminInitialized) {
			return <RegisterPage />;
		}

		return (
			<div>
				<Route path="/songdatabases" component={SongDatabasesPage} />
				<Route
					path="/songdatabase/:songDatabaseId"
					component={SongDatabasePage}
				/>
				<Route
					path="/matiasclient/:matiasClientId"
					component={MatiasClientPage}
				/>
				<Route path="/matiasclients" component={MatiasClientsPage} />
				<Route path="/songs" component={SongsPage} />
				<Route path="/login" component={LoginPage} />
			</div>
		);
	}
);
