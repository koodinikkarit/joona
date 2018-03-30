import * as React from "react";
import { Route } from "react-router-dom";

// import {
// 	SongDatabasesPage,
// 	SongDatabasePage,
// 	MatiasClientPage,
// 	MatiasClientsPage,
// 	SongsPage,
// 	LoginPage
// } from "./pages";
import { graphql, ChildProps } from "react-apollo";
import { PAGE_VIEWER_QUERY } from "./servergql";
import { getPageViewerQuery } from "./types";
import { TagsPage } from "./pages/TagsPage";

const withViewer = graphql(PAGE_VIEWER_QUERY);

export const Routes = withViewer(
	(props: ChildProps<{}, getPageViewerQuery>) => {
		if (props.data.loading) {
			return <div />;
		}

		if (props.data.error) {
			return <div />;
		}

		if (!props.data.viewer.hasAdminUser) {
			window.location.replace(
				process ? process.env.REACT_APP_MARKO_BASE_URL : "/"
			);
		}

		if (!props.data.viewer.user) {
			window.location.replace(
				process
					? process.env.REACT_APP_MARKO_BASE_URL + "/login"
					: "/login"
			);
		}

		return (
			<div>
				<Route path="/tags" component={TagsPage} />
				{/* <Route path="/songdatabases" component={SongDatabasesPage} />
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
				<Route path="/login" component={LoginPage} /> */}
			</div>
		);
	}
);
