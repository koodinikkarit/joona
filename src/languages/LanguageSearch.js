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
		query searchLanguages($params: SearchLanguagesInput) {
			allLanguages: searchLanguages(params: $params) {
				languages {
					id
					name
				}
				maxLanguages
			}
		}
	`
)(
	class extends React.Component {
		state = {
			searchWord: ""
		};

		render() {
			const languages = this.props.data.allLanguages
				? this.props.data.allLanguages.languages
				: [];
			const numberOfTags = languages.length;
			const maxTags = this.props.data.allLanguages
				? this.props.data.allLanguages.maxLanguages
				: 0;
			return (
				<Panel
					header={<h4>Kielien haku</h4>}
					footer={
						<Row>
							<Col md={12}>
								Näytetään {numberOfTags} tulosta {maxTags}{" "}
								tuloksesta
							</Col>
						</Row>
					}
				>
					<FieldGroup
						type="text"
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
						{languages.map(p => (
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
