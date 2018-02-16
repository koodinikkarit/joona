import React, { Component } from "react";
import gql from "graphql-tag";
import graphql from "react-apollo/graphql";

import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";

import { Link } from "react-router-dom";

import FieldGroup from "../form/FieldGroup";

const allMatiasClients = gql`
	query searchMatiasClients {
		allMatiasClients: searchMatiasClients {
			matiasClients {
				id
				name
				hostName
			}
		}
	}
`;

class SearchMatiasClients extends Component {
	render() {
		const matiasClients = this.props.data.allMatiasClients
			? this.props.data.allMatiasClients.matiasClients
			: [];
		return (
			<Panel header={<h4>Hae matiaksia</h4>}>
				<FieldGroup
					tyoe="text"
					label="Hakusana"
					placeholder="Hakusana"
					delay={400}
				/>
				<ListGroup>
					{matiasClients.map(p => (
						<ListGroupItem key={p.id}>
							<Link to={`/matiasclient/${p.id}`}>
								{p.hostName}
							</Link>
						</ListGroupItem>
					))}
				</ListGroup>
			</Panel>
		);
	}
}

export default graphql(allMatiasClients)(SearchMatiasClients);
