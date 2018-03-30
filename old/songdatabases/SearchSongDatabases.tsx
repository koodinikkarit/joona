// import * as React from "react";
// import { graphql, compose } from "react-apollo";
// import gql from "graphql-tag";

// import { Panel, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";

// import { SongDatabaseType } from "../types";

// type SearchSongDatabasesInputType = {
// 	data?: {
// 		loading: boolean;
// 		allSongDatabases?: {
// 			maxSongDatabases: number;
// 			songDatabases: SongDatabaseType[];
// 		};
// 	};
// 	setSearchSongDatabasesSearchWord?: (searchWord: string) => void;
// };

// const SearchSongDatabasesPC = (props: SearchSongDatabasesInputType) => {
// 	if (props.data.loading) {
// 		return <h1>Ladataan...</h1>;
// 	}
// 	const numberOfSongDatabases =
// 		props.data.allSongDatabases.songDatabases.length;
// 	const maxSongDatabases = props.data.allSongDatabases.maxSongDatabases;
// 	return (
// 		<Panel>
// 			<Panel.Heading>
// 				<h4>Laulutietokantojen haku</h4>
// 			</Panel.Heading>
// 			<Panel.Body>
// 				<ListGroup>
// 					{props.data.allSongDatabases.songDatabases.map(p => (
// 						<LinkContainer to={"/songdatabase/" + p.id}>
// 							<ListGroupItem key={p.id}>{p.name}</ListGroupItem>
// 						</LinkContainer>
// 					))}
// 				</ListGroup>
// 			</Panel.Body>
// 			<Panel.Footer>
// 				<Row>
// 					<Col md={12}>
// 						Näytetään {numberOfSongDatabases} tulosta{" "}
// 						{maxSongDatabases} tuloksesta
// 					</Col>
// 				</Row>
// 			</Panel.Footer>
// 		</Panel>
// 	);
// };

// // const withSetSongDatabaseSearchWord = graphql(
// // 	gql`
// // 		mutation setSearchSongDatabasesSearchWord($searchWord: String) {
// // 			setSearchSongDatabasesSearchWord(searchWord: $searchWord)
// // 		}
// // 	`,
// // 	{
// // 		props: ({ mutate }) => ({
// // 			setSearchSongDatabasesSearchWord: ({
// // 				searchWord
// // 			}: {
// // 				searchWord: string;
// // 			}) =>
// // 				mutate({
// // 					variables: {
// // 						searchWord
// // 					}
// // 				})
// // 		})
// // 	}
// // );

// const searchSongDatabasesQuery = gql`
// 	query searchSongDatabases {
// 		allSongDatabases: searchSongDatabases {
// 			totalCount
// 			songDatabases {
// 				id
// 				name
// 			}
// 		}
// 	}
// `;

// const withSongDatabases = graphql(searchSongDatabasesQuery);

// export const SearchSongDatabases = compose(
// 	withSongDatabases
// 	// withSetSongDatabaseSearchWord
// )(SearchSongDatabasesPC);
