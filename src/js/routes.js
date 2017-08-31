import React from "react";
import {
	Route
} from "react-router-dom";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import SongDatabasesSearch from "./databases/SongDatabaseSearch";

import SongSearchPage from "./pages/SongSearchPage";
import EditSongPage from "./pages/EditSongPage";
import CreateSongPage from "./pages/CreateSongPage";

import CreateSongDatabasePage from "./pages/CreateSongDatabasePage";
import EditSongDatabasePage from "./pages/EditSongDatabasePage";

import EwDatabasesSearchPage from "./pages/EwDatabasesSearchPage";
import CreateEwDatabasePage from "./pages/CreateEwDatabasePage";
import EditEwDatabasePage from "./pages/EditEwDatabasePage";

import TagSearchPage from "./pages/TagSearchPage";
import CreateTagPage from "./pages/CreateTagPage";
import EditTagPage from "./pages/EditTagPage";

import LanguageSearchPage from "./pages/LanguageSearchPage";
import CreateLanguagePage from "./pages/CreateLanguagePage";
import EditLanguagePage from "./pages/EditLanguagePage";

import LoginPage from "./pages/LoginPage";

export default class Routes extends React.Component {
	render() {
		return (
			<div>
				<Grid>
					<Route path="/songs" component={SongSearchPage} />
					<Route path="/createsong" component={CreateSongPage} />
					<Route path="/editsong/:id" component={EditSongPage} />

					<Route path="/songdatabases"
						component={({
							history
						}) => (
							<Row>
								<Col md={12}>
									<SongDatabasesSearch
										createNewSongDatabaseEnabled={true} />
								</Col>
							</Row>
						)} />

					<Route path="/createsongdatabase" component={CreateSongDatabasePage} />
					<Route path="/editsongdatabase/:songDatabaseId" component={EditSongDatabasePage} />
					<Route path="/ewdatabases" component={EwDatabasesSearchPage} />
					<Route path="/createewdatabase" component={CreateEwDatabasePage} />
					<Route path="/editewDatabase/:ewDatabaseId" component={EditEwDatabasePage} />
					<Route path="/tags" component={TagSearchPage} />
					<Route path="/createtag" component={CreateTagPage} />
					<Route path="/edittag/:id" component={EditTagPage} />
					<Route path="/languages" component={LanguageSearchPage} />
					<Route path="/createlanguage" component={CreateLanguagePage} />
					<Route path="/editlanguage/:languageId" component={EditLanguagePage} />
					<Route path="/login" component={LoginPage} />
				</Grid>
			</div>
		)
	}
}
