import React from "react";
import { Route } from "react-router-dom";

import Grid from "react-bootstrap/lib/Grid";

import SongDatabasesPage from "./pages/SongDatabasesPage";
import SongsPage from "./pages/SongsPage";
import TagsPage from "./pages/TagsPage";
import LanguagesPage from "./pages/LanguagesPage";
import AuthorsPage from "./pages/AuthorsPage";
import CopyrightPage from "./pages/CopyrightsPage";
import MatiasClientsPage from "./pages/MatiasClientsPage";
import MatiasClientPage from "./pages/MatiasClientPage";

export default class Routes extends React.Component {
	render() {
		return (
			<div>
				<Grid fluid={true}>
					<Route
						path="/songdatabases"
						component={SongDatabasesPage}
					/>
					<Route path="/songs" component={SongsPage} />
					<Route path="/tags" component={TagsPage} />
					<Route path="/languages" component={LanguagesPage} />
					<Route path="/authors" component={AuthorsPage} />
					<Route path="/copyrights" component={CopyrightPage} />
					<Route
						path="/matiasclients"
						component={MatiasClientsPage}
					/>
					<Route
						path="/matiasclient/:matiasClientId"
						component={MatiasClientPage}
					/>
				</Grid>
			</div>
		);
	}
}
