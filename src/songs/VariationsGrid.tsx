// import * as React from "react";
// import gql from "graphql-tag";
// import { graphql, compose } from "react-apollo";

// import { Row, Col } from "react-bootstrap";

// import { EditVariation } from "./";

// type ResponseProps = {
// 	data?: {
// 		loading: boolean;
// 		queryString?: {
// 			songs: string[];
// 		};
// 	};
// 	removeSelectedSong?: (songId: string) => void;
// };

// const VARIATIONS_QUERY = gql`
// 	query ReadSelectedVariations {
// 		queryString @client {
// 			songs
// 		}
// 	}
// `;

// const REMOVE_SELECTED_SONG_MUTATION = gql`
// 	mutation RemoveSelectedSong($songId: ID) {
// 		removeSelectedSong(songId: $songId) @client
// 	}
// `;

// const withSelectedVariations = graphql<ResponseProps>(VARIATIONS_QUERY);

// const withRemoveSelectedSong = graphql<ResponseProps>(
// 	REMOVE_SELECTED_SONG_MUTATION,
// 	{
// 		props: ({ mutate }) => ({
// 			removeSelectedSong: songId =>
// 				mutate({
// 					variables: {
// 						songId
// 					}
// 				})
// 		})
// 	}
// );

// export const VariationsGrid = compose(
// 	withSelectedVariations,
// 	withRemoveSelectedSong
// )((props: ResponseProps) => {
// 	if (props.data.loading) {
// 		return <h1>Ladataan...</h1>;
// 	}
// 	return (
// 		<Row>
// 			<Col md={12}>
// 				{props.data.queryString.songs.map(selectedVariation => (
// 					<div
// 						key={selectedVariation}
// 						className="HorizontalListPanel"
// 					>
// 						<EditVariation
// 							variationId={selectedVariation}
// 							onCancel={songId => {
// 								props.removeSelectedSong(songId);
// 							}}
// 						/>
// 					</div>
// 				))}
// 			</Col>
// 		</Row>
// 	);
// });
