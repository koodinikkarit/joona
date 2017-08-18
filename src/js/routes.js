import React from "react";
import {
	Route
} from 'react-router-dom'

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

export default (
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
								createNewSongDatabaseEnabled={true}/>
						</Col>
					</Row>
				)}/>
			
			<Route path="/createsongdatabase" component={CreateSongDatabasePage} />
			<Route path="/editsongdatabase/:songDatabaseId" component={EditSongDatabasePage} />
			<Route path="/ewdatabases" component={EwDatabasesSearchPage} />
			<Route path="/createewdatabase" component={CreateEwDatabasePage} />
			<Route path="/editewDatabase/:ewDatabaseId" component={EditEwDatabasePage} />
		</Grid>
	</div>
)