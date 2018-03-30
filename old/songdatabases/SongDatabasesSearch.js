// import React, { Component } from "react";
// import gql from "graphql-tag";
// import graphql from "react-apollo/graphql";

// import Row from "react-bootstrap/lib/Row";
// import Col from "react-bootstrap/lib/Col";
// import Panel from "react-bootstrap/lib/Panel";
// import ListGroup from "react-bootstrap/lib/ListGroup";
// import ListGroupItem from "react-bootstrap/lib/ListGroupItem";

// import FieldGroup from "../form/FieldGroup";

// export default graphql(
// 	gql`
// 		query searchSongDatabases {
// 			allSongDatabases: searchSongDatabases {
// 				songDatabases {
// 					id
// 					name
// 				}
// 				maxSongDatabases
// 			}
// 		}
// 	`
// )(
// 	class extends React.Component {
// 		state = {
// 			searchWord: ""
// 		};

// 		render() {
// 			const songDatabases = this.props.data.allSongDatabases
// 				? this.props.data.allSongDatabases.songDatabases
// 				: [];
// 			const numberOfSongDatabases = songDatabases.length;
// 			const maxSongDatabases = this.props.data.allSongDatabases
// 				? this.props.data.allSongDatabases.maxSongDatabases
// 				: 0;
// 			return (
// 				<Panel
// 					header={<h4>Laulutietokantojen haku</h4>}
// 					footer={
// 						<Row>
// 							<Col md={12}>
// 								Näytetään {numberOfSongDatabases} tulosta{" "}
// 								{maxSongDatabases} tuloksesta
// 							</Col>
// 						</Row>
// 					}
// 				>
// 					<FieldGroup
// 						tyoe="text"
// 						label="Hakusana"
// 						placeholder="Hakusana"
// 						delay={400}
// 						value={this.state.searchWord}
// 						onChange={value => {
// 							this.setState({
// 								searchWord: value
// 							});
// 						}}
// 					/>
// 					<ListGroup>
// 						{songDatabases.map(p => (
// 							<ListGroupItem
// 								key={p.id}
// 								href="#"
// 								onClick={() => {
// 									if (this.props.onSongDatabaseClicked) {
// 										this.props.onSongDatabaseClicked(p.id);
// 									}
// 								}}
// 							>
// 								{p.name}
// 							</ListGroupItem>
// 						))}
// 					</ListGroup>
// 				</Panel>
// 			);
// 		}
// 	}
// );
