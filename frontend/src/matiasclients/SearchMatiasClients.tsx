import * as React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { Row, Col, Panel, ListGroup, ListGroupItem } from "react-bootstrap";

import { MatiasClientType } from "../types";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";

type SearchMatiasClientsPCInputProps = {
	data?: {
		loading: boolean;
		allMatiasClients?: {
			maxMatiasClients: number;
			matiasClients: MatiasClientType[];
		};
	};
};

export const SearchMatiasClientsPC = (
	props: SearchMatiasClientsPCInputProps
) => {
	if (props.data.loading) {
		return <h1>Ladataan....</h1>;
	}
	const numberOfMatiasClients =
		props.data.allMatiasClients.matiasClients.length;
	const maxMatiasClients = props.data.allMatiasClients.maxMatiasClients;
	return (
		<Panel>
			<Panel.Heading>
				<h3>Hae matiaksia</h3>
			</Panel.Heading>
			<Panel.Body>
				<ListGroup>
					{props.data.allMatiasClients.matiasClients.map(p => (
						<LinkContainer key={p.id} to={"/matiasclient/" + p.id}>
							<ListGroupItem>
								{p.name || p.hostName}
							</ListGroupItem>
						</LinkContainer>
					))}
				</ListGroup>
			</Panel.Body>
			<Panel.Footer>
				<Row>
					<Col md={12}>
						Näytetään {numberOfMatiasClients} tulosta{" "}
						{maxMatiasClients} tuloksesta
					</Col>
				</Row>
			</Panel.Footer>
		</Panel>
	);
};

const withMatiasClients = graphql(gql`
	query searchMatiasClients {
		allMatiasClients: searchMatiasClients {
			matiasClients {
				id
				name
				hostName
				key
				accepted
			}
			totalCount
		}
	}
`);

export const SearchMatiasClients = withMatiasClients(SearchMatiasClientsPC);
