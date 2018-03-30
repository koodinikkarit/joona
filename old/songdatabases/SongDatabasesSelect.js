// import React, { Component } from "react";
// import gql from "graphql-tag";
// import graphql from "react-apollo/graphql";

// import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";

// const allSongDatabasesQuery = gql`
// 	query searchSongDatabases {
// 		allSongDatabases: searchSongDatabases {
// 			songDatabases {
// 				id
// 				name
// 			}
// 		}
// 	}
// `;

// class SongDatabasesSelect extends Component {
// 	render() {
// 		const songDatabases = this.props.data.allSongDatabases
// 			? this.props.data.allSongDatabases.songDatabases
// 			: [];

// 		return (
// 			<FormGroup controlId="formControlsSelect">
// 				<ControlLabel>Valitse laulutietokanta</ControlLabel>
// 				<FormControl
// 					componentClass="select"
// 					placeholder="select"
// 					onSelect={e => {
// 						if (e.target.value) {
// 							if (this.props.onSelect) {
// 								this.props.onSelect(e.target.value);
// 							}
// 						}
// 					}}
// 				>
// 					{songDatabases.length > 0 ? (
// 						songDatabases.map(p => (
// 							<option key={p.id} value={p.id}>
// 								{p.name}
// 							</option>
// 						))
// 					) : (
// 						<option>Ei laulutietokantoja</option>
// 					)}
// 				</FormControl>
// 			</FormGroup>
// 		);
// 	}
// }

// export default graphql(allSongDatabasesQuery)(SongDatabasesSelect);
