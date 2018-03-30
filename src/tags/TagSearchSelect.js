import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import Panel from "react-bootstrap/lib/Panel";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Checkbox from "react-bootstrap/lib/Checkbox";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";

import DelayTextInput from "../form/DelayTextInput";

class Results extends Component {
	render() {
		const tags = this.props.data.allTags
			? this.props.data.allTags.tags
			: [];
		const maxTags = this.props.data.allTags
			? this.props.data.allTags.maxTags
			: 0;
		return (
			<FormGroup
				style={{
					maxHeight: "200px",
					overflowY: "auto"
				}}
			>
				{tags.map(p => <Checkbox key={p.id}>{p.name}</Checkbox>)}
			</FormGroup>
		);
	}
}

const allTags = gql`
	query searchSelectTags($params: SearchTagsInput) {
		allTags: searchTags(params: $params) {
			tags {
				id
				name
			}
			maxTags
		}
	}
`;

const ResultsWithData = graphql(allTags, {
	options: ownProps => {
		return {
			variables: {
				params: {
					searchWord: ownProps.searchWord
				}
			}
		};
	}
})(Results);

class TagSearchSelect extends Component {
	state = {
		searchWord: ""
	};

	render() {
		const numberOfTags = 0;
		const maxTags = 0;
		return (
			<Panel
				header={<ControlLabel>Tunnisteet</ControlLabel>}
				footer={
					<Row>
						<Col md={8}>
							Näytetään {numberOfTags} tulosta {maxTags}{" "}
							tuloksesta
						</Col>
						<Col md={4}>
							<Button>Tyhjennä</Button>
						</Col>
					</Row>
				}
			>
				<div style={{ marginBottom: "10px" }}>
					<DelayTextInput
						placeholder="Hae tunnisteita"
						value={this.state.searchWord}
						delay={400}
						onChange={value => {
							this.setState({
								searchWord: value
							});
						}}
					/>
				</div>
				<ResultsWithData searchWord={this.state.searchWord} />
			</Panel>
		);
	}
}

export default graphql(allTags)(TagSearchSelect);
