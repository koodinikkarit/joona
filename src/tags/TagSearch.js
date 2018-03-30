import React, { Component } from "react";
import gql from "graphql-tag";
import graphql from "react-apollo/graphql";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Panel from "react-bootstrap/lib/Panel";
import ListGroup from "react-bootstrap/lib/ListGroup";
import ListGroupItem from "react-bootstrap/lib/ListGroupItem";

import FieldGroup from "../form/FieldGroup";

const TagSearchResults = graphql(
	gql`
		query searchTags($params: SearchTagsInput) {
			allTags: searchTags(params: $params) {
				tags {
					id
					name
				}
				maxTags
			}
			allLanguages: searchLanguages {
				languages {
					id
					name
				}
			}
		}
	`,
	{
		options: ownProps => {
			return {
				variables: {
					params: {
						searchWord: ownProps.searchWord,
						limit: 200
					}
				}
			};
		}
	}
)(
	class extends Component {
		render() {
			const tags = this.props.data.allTags
				? this.props.data.allTags.tags
				: [];
			return (
				<ListGroup>
					{tags.map(p => (
						<ListGroupItem key={p.id} href="#">
							{p.name}
						</ListGroupItem>
					))}
				</ListGroup>
			);
		}
	}
);

class TagSearch extends Component {
	state = {
		searchWord: ""
	};

	render() {
		const numberOfTags = 0;
		const maxTags = 0;
		return (
			<Panel
				header={<h4>Tunnisteiden haku</h4>}
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
				<TagSearchResults searchWord={this.state.searchWord} />
			</Panel>
		);
	}
}

export default TagSearch;
