import * as React from "react";
import { Grid } from "react-bootstrap";
import { CreateSongDatabase, SearchSongDatabases } from "../songdatabases";

export class SongDatabasesPage extends React.Component {
	render() {
		return (
			<Grid>
				<CreateSongDatabase />
				<SearchSongDatabases />
			</Grid>
		);
	}
}
