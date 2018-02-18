import React, { Component } from "react";
import gql from "graphql-tag";
import graphql from "react-apollo/graphql";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Panel from "react-bootstrap/lib/Panel";
import ListGroup from "react-bootstrap/lib/ListGroup";
import ListGroupItem from "react-bootstrap/lib/ListGroupItem";

import FieldGroup from "../form/FieldGroup";

export default graphql(
	gql`
		query searchCopyrights($params: SearchCopyrightsInput) {
			allCopyrights: searchCopyrights(params: $params) {
				copyrights {
					id
					name
				}
				maxCopyrights
			}
		}
	`
)(
	class extends React.Component {
		state = {
			searchWord: ""
		};

		render() {
			const copyrights = this.props.data.allCopyrights
				? this.props.data.allCopyrights.copyrights
				: [];
			const numberOfCopyrights = copyrights.length;
			const maxCopyrights = this.props.data.allCopyrights
				? this.props.data.allCopyrights.maxCopyrights
				: 0;
			return (
				<Panel
					header={<h4>Tekijänoikeuksien haku</h4>}
					footer={
						<Row>
							<Col md={12}>
								Näytetään {numberOfCopyrights} tulosta{" "}
								{maxCopyrights} tuloksesta
							</Col>
						</Row>
					}
				>
					<FieldGroup
						tyoe="text"
						label="Hakusana"
						placeholder="Hakusana"
						delay={400}
						value={this.state.searchWord}
						onChange={value => {
							this.setState({
								searchWord: value
							});
						}}
					/>
					<ListGroup>
						{copyrights.map(p => (
							<ListGroupItem key={p.id} href="#">
								{p.name}
							</ListGroupItem>
						))}
					</ListGroup>
				</Panel>
			);
		}
	}
);
