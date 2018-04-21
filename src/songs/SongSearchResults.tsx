import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import {
	searchVariationsQuery,
	searchVariationsQueryVariables
} from "../types";
import { SEARCH_VARIATIONS_QUERY } from "../servergql";
import { LinkContainer } from "react-router-bootstrap";
import { SONGS_SEARCH_WORD_QUERY } from "../stategql";

export const SongSearchResults = () => {
	return (
		<Panel>
			<Panel.Heading>Lauluhakutulokset</Panel.Heading>
			<Panel.Body>
				<Query query={SONGS_SEARCH_WORD_QUERY}>
					{(
						props2: QueryResult<{
							songsSearchWord: string;
						}>
					) => {
						if (props2.loading) {
							return <div />;
						}
						return (
							<Query
								query={SEARCH_VARIATIONS_QUERY}
								variables={{
									searchWord: props2.data.songsSearchWord
								}}
							>
								{(
									props: QueryResult<
										searchVariationsQuery,
										searchVariationsQueryVariables
									>
								) => {
									if (props.loading) {
										return <div>Ladataan...</div>;
									}

									return (
										<div>
											<ListGroup>
												{props.data.searchVariations.variations.map(
													p => (
														<LinkContainer
															to={
																"/variation/" +
																p.id
															}
														>
															<ListGroupItem
																key={p.id}
															>
																{p.name}
															</ListGroupItem>
														</LinkContainer>
													)
												)}
											</ListGroup>
											Näytetään{" "}
											{
												props.data.searchVariations
													.variations.length
											}{" "}
											laulua{" "}
											{
												props.data.searchVariations
													.totalCount
											}{" "}
											laulusta
										</div>
									);
								}}
							</Query>
						);
					}}
				</Query>
			</Panel.Body>
		</Panel>
	);
};

// import gql from "graphql-tag";
// import { graphql } from "react-apollo";

// import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";

// type InputProps = {
// 	onSongSelected?: (song: number) => void;
// };

// type ResponseProps = {
// 	data?: {
// 		loading: boolean;
// 		variationsConnection?: {
// 			totalCount: number;
// 			variations: {
// 				id: number;
// 				name: string;
// 				text: string;
// 			}[];
// 		};
// 	};
// 	onSongSelected?: (songId: number) => void;
// };

// const SEARCH_VARIATIONS_QUERY = gql`
// 	query SearchVariations {
// 		variationsConnection: searchVariations {
// 			totalCount
// 			variations {
// 				id
// 				name
// 				text
// 			}
// 		}
// 	}
// `;

// export const SongSearchResults = graphql<ResponseProps, InputProps>(
// 	SEARCH_VARIATIONS_QUERY
// )((props: ResponseProps) => {
// 	if (props.data.loading) {
// 		return <h1>Ladataan...</h1>;
// 	}
// 	return (
// 		<Panel>
// 			<Panel.Heading>Hakutulokset</Panel.Heading>
// 			<Panel.Body>
// 				<ListGroup>
// 					{props.data.variationsConnection.variations.map(
// 						variation => (
// 							<ListGroupItem
// 								key={variation.id}
// 								href="#"
// 								onClick={() => {
// 									if (props.onSongSelected) {
// 										props.onSongSelected(variation.id);
// 									}
// 								}}
// 							>
// 								{variation.name}
// 							</ListGroupItem>
// 						)
// 					)}
// 				</ListGroup>
// 			</Panel.Body>
// 		</Panel>
// 	);
// });
