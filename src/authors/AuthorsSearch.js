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
		query searchAuthors($params: SearchAuthorsInput) {
			allAuthors: searchAuthors(params: $params) {
				authors {
					id
					name
				}
				maxAuthors
			}
		}
	`
)(
	class extends React.Component {
		state = {
			searchWord: ""
		};

		render() {
			const authors = this.props.data.allAuthors
				? this.props.data.allAuthors.authors
				: [];
			const numberOfAuthors = authors.length;
			const maxAuthors = this.props.data.allAuthors
				? this.props.data.allAuthors.maxAuthors
				: 0;
			return (
				<Panel
					header={<h4>Kirjoittajien haku</h4>}
					footer={
						<Row>
							<Col md={12}>
								Näytetään {numberOfAuthors} tulosta {maxAuthors}{" "}
								tuloksesta
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
						{authors.map(p => (
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
