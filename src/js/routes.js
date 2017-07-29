import React from "react";
import {
	Route
} from 'react-router-dom'

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import SongSearch from "./songs/SongSearch";

import CreateSong from "./songs/CreateSong";
import EditSong from "./songs/EditSong";

import SongDatabasesSearch from "./databases/SongDatabaseSearch";

import CreateSongDatabasePage from "./pages/CreateSongDatabasePage";
import EditSongDatabasePage from "./pages/EditSongDatabasePage";

export default (
	<div>
		<Grid>
			<Route path="/songs" component={({
				history
			}) => (
				<Row>
					<Col md={12}>
						<SongSearch history={history} />
					</Col>
				</Row>
			)} />
			<Route path="/createsong" component={({
				history
			}) => (
				<Row>
					<Col md={6}>
						<CreateSong history={history} />
					</Col>
					<Col md={6}>
						<SongSearch history={history} />
					</Col>
				</Row>
			)} />
			<Route path="/editsong/:id" component={({
				history,
				match
			}) => (
				<Row>
					<Col md={6}>
						<EditSong history={history} variationId={match.params.id} />
					</Col>
					<Col md={6}>
						<SongSearch history={history} />
					</Col>
				</Row>
			)} />

			<Route path="/songdatabases" 
				component={({
					history
				}) => (
					<Row>
						<Col md={12}>
							<SongDatabasesSearch />
						</Col>
					</Row>
				)}/>
			
			<Route path="/createsongdatabase" component={CreateSongDatabasePage} />
			<Route path="/editsongdatabase/:songDatabaseId" component={EditSongDatabasePage} />
		</Grid>
	</div>
)