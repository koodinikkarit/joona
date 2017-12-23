import React from "react";
import { Route } from "react-router-dom";

import Grid from "react-bootstrap/lib/Grid";

import SongDatabasesPage from "./pages/SongDatabasesPage";
import SongsPage from "./pages/SongsPage";
import TagsPage from "./pages/TagsPage";
import LanguagesPage from "./pages/LanguagesPage";
import AuthorsPage from "./pages/AuthorsPage";
import CopyrightPage from "./pages/CopyrightsPage";

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
				</Grid>
			</div>
		);
	}
}
