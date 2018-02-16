import React, { Component } from "react";
import gql from "graphql-tag";
import graphql from "react-apollo/graphql";

import Panel from "react-bootstrap/lib/Panel";
import ListGroup from "react-bootstrap/lib/ListGroup";
import ListGroupItem from "react-bootstrap/lib/ListGroupItem";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";

const allVariations = gql`
	query allVariations($params: SearchVariationsInput) {
		allVariations: searchVariations(params: $params) {
			variations {
				id
				name
				text
			}
			maxVariations
		}
	}
`;

class SongSearchResults extends Component {
	render() {
		const variations = this.props.data.allVariations
			? this.props.data.allVariations.variations
			: [];
		const numberOfTags = variations.length;
		const maxTags = this.props.data.allVariations
			? this.props.data.allVariations.maxVariations
			: 0;

		return (
			<Panel
				header={<h4>Hakutulokset</h4>}
				footer={
					<Row>
						<Col md={8}>
							Näytetään {numberOfTags} tulosta {maxTags}{" "}
							tuloksesta
						</Col>
						<Col md={4}>
							<Button
								onClick={() => {
									if (this.props.onClearSelection) {
										this.props.onClearSelection();
									}
								}}
							>
								Tyhjennä valinnat
							</Button>
						</Col>
					</Row>
				}
			>
				<ListGroup style={{ maxHeight: "500px", overflowY: "auto" }}>
					{variations.map(v => {
						const isSelected = this.props.selectedSongs.some(
							p => p === v.id
						);

						let textParts = [];
						const songText = v.text.toLowerCase();
						const searchWord = this.props.searchWord
							? this.props.searchWord.toLowerCase()
							: "";
						if (searchWord != "" && songText.includes(searchWord)) {
							let i = 0;
							songText.split("\n").forEach(line => {
								if (line.includes(searchWord)) {
									let matches = [];
									let i = 0;
									while (true) {
										const a = line.indexOf(searchWord, i);
										if (a === -1) break;
										i = a + searchWord.length;
										matches.push({
											start: a,
											end: i
										});
									}

									let text = "";
									for (
										let x = 0, y = 0;
										x < line.length;
										x++
									) {
										if (matches[y]) {
											if (x === matches[y].start) {
												textParts.push(
													<span>{text}</span>
												);
												text = "";
												//text +=
												//	"<span style={{ color: 'green'}}>";
											}
											if (x === matches[y].end) {
												textParts.push(
													<span
														style={{
															color: "green",
															fontWeight: "bold"
														}}
													>
														{text}
													</span>
												);
												text = "";
												// text += "</span>";
												y++;
											}
										}
										text += line[x];
									}
									textParts.push(<span>{text}</span>);
									textParts.push(<br />);
								}
							});
						}
						return (
							<ListGroupItem
								key={v.id}
								bsStyle={isSelected && "info"}
								onClick={() => {
									if (isSelected) {
										if (this.props.onUnSelect) {
											this.props.onUnSelect(v.id);
										}
									} else {
										if (this.props.onSelect) {
											this.props.onSelect(v.id);
										}
									}
								}}
							>
								{v.name}
								<br />
								{textParts.map(p => p)}
							</ListGroupItem>
						);
					})}
				</ListGroup>
			</Panel>
		);
	}
}

export default graphql(allVariations, {
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
})(SongSearchResults);
