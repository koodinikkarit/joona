import * as React from "react";
import { Route } from "react-router-dom";

import {
	SongDatabasesPage,
	SongDatabasePage,
	MatiasClientPage,
	MatiasClientsPage
} from "./pages";

export const Routes = () => {
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
		</div>
	);
};
