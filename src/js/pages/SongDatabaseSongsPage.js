import React from "react";
import {
	compose
} from "react-apollo";


import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import SongSearch from "../songs/SongSearch";

export class SongDatabaseSongsPage extends React.Component {
	render() {
		const {
			songDatabaseId
		} = this.props.match.params;

		return (
			<Row>
				<Col md={12}>
					<SongSearch
						songDatabaseId={songDatabaseId}
						getSongItemLink={id => {
							return `/songdatabase/${songDatabaseId}/editsong/${id}`;
						}} />
				</Col>
			</Row>
		);
	}
}

export default compose (

)(SongDatabaseSongsPage);