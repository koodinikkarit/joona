import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import { searchVariationsQuery } from "../types";
import { SEARCH_VARIATIONS_QUERY } from "../servergql";
import { LinkContainer } from "react-router-bootstrap";

export const SongSearchResults = () => {
	return (
		<Panel>
			<Panel.Heading>Lauluhakutulokset</Panel.Heading>
			<Panel.Body>
				<ListGroup>
					<Query query={SEARCH_VARIATIONS_QUERY}>
						{(props: QueryResult<searchVariationsQuery>) => {
							if (props.loading) {
								return <div>Ladataan...</div>;
							}

							return props.data.searchVariations.variations.map(
								p => (
									<LinkContainer to={"/variation/" + p.id}>
										<ListGroupItem key={p.id}>
											{p.name}
										</ListGroupItem>
									</LinkContainer>
								)
							);
						}}
					</Query>
				</ListGroup>
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
