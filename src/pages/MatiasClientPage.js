import React, { Component } from "react";
import gql from "graphql-tag";
import graphql from "react-apollo/graphql";

import { Panel, PanelGroup, Button, Grid } from "react-bootstrap";

import FieldGroup from "../form/FieldGroup";
import SongDatabaseSelect from "../songdatabases/SongDatabasesSelect";

const fetchMatiasClientQuery = gql`
	query fetchMatiasClient($matiasClientId: ID) {
		matiasClient(matiasClientId: $matiasClientId) {
			id
			name
			hostName
			ewDatabases {
				id
				name
				filesystemPath
			}
		}
	}
`;

class MatiasClient extends Component {
	state = {
		creatingEwDatabase: false
	};

	render() {
		const matiasClient = this.props.data.matiasClient || {};
		return (
			<Grid>
				<Panel header={<h1>Matias</h1>}>
					<div>Isäntänimi: {matiasClient.hostName} </div>
					<h4>Ew tietokannat</h4>
					<Button
						bsStyle="info"
						onClick={() => {
							this.setState({
								creatingEwDatabase: true
							});
						}}
					>
						Luo ewtietokanta
					</Button>
					<Panel header={"Lisää ewtietokanta"}>
						<FieldGroup
							type="text"
							label="Tietokantanimi"
							placeholder="Tietokantanimi"
						/>
						<FieldGroup
							type="text"
							label="Tiedostopolku"
							placeholder="Tiedostopolku"
						/>
						<SongDatabaseSelect />
					</Panel>
					<PanelGroup>
						<Panel>asd</Panel>
						<Panel>asd</Panel>
						<Panel>asd</Panel>
						<Panel>asd</Panel>
					</PanelGroup>
				</Panel>
			</Grid>
		);
	}
}

export default graphql(fetchMatiasClientQuery, {
	options: ownProps => {
		return {
			variables: {
				matiasClientId: ownProps.match.params.matiasClientId
			}
		};
	}
})(MatiasClient);
