import * as React from "react";
import { Grid, Button } from "react-bootstrap";
import { CreateSongDatabase, SearchSongDatabases } from "../songdatabases";

export class SongDatabasesPage extends React.Component {
	state = {
		creatingSongDatabase: false
	};

	render() {
		return (
			<Grid>
				<div className="AppendBottom">
					{this.state.creatingSongDatabase ? (
						<CreateSongDatabase
							onCancel={() => {
								this.setState({
									creatingSongDatabase: false
								});
							}}
							onSuccess={() => {
								this.setState({
									creatingSongDatabase: false
								});
							}}
						/>
					) : (
						<Button
							bsStyle="info"
							onClick={() => {
								this.setState({
									creatingSongDatabase: true
								});
							}}
						>
							{" "}
							Luo laulutietokanta{" "}
						</Button>
					)}
				</div>
				<SearchSongDatabases />
			</Grid>
		);
	}
}
