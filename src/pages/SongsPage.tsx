import * as React from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";
import {
	SongSearchSettings,
	SongSearchResults,
	CreateVariation
} from "../songs";
import { AppendBottom } from "../layout";

export class SongsPage extends React.Component {
	state = {
		creatingSong: false
	};

	render() {
		return (
			<Grid fluid={true}>
				<Row>
					<Col lg={7}>
						{this.state.creatingSong && (
							<CreateVariation
								onCancel={() => {
									this.setState({
										creatingSong: false
									});
								}}
								onSuccess={() => {
									this.setState({
										creatingSong: false
									});
								}}
							/>
						)}
					</Col>
				</Row>
				<Row>
					<Col sm={4}>
						{!this.state.creatingSong && (
							<AppendBottom>
								<Button
									onClick={() => {
										this.setState({
											creatingSong: true
										});
									}}
								>
									Luo laulu
								</Button>
							</AppendBottom>
						)}
						<SongSearchSettings />
					</Col>
					<Col sm={8}>
						<SongSearchResults />
					</Col>
				</Row>
			</Grid>
		);
	}
}

// import gql from "graphql-tag";
// import { graphql, compose } from "react-apollo";

// import { Grid, Row, Col, Button } from "react-bootstrap";

// import { CreateVariation } from "../songs";

// import {
// 	VariationsGrid,
// 	SongSearchSettings,
// 	SongSearchResults
// } from "../songs";

// type ResponseProps = {
// 	data?: {
// 		loading: boolean;
// 		songsPageState?: {
// 			creatingSong: boolean;
// 		};
// 	};
// 	updateSongsPageState?: (
// 		props: {
// 			creatingSong: boolean;
// 		}
// 	) => void;
// 	addSelectedSong?: (songId: number) => void;
// 	removeSelectedSong?: (songId: number) => void;
// };

// const SONGSPAGE_STATE = gql`
// 	query ReadSongsPageState {
// 		songsPageState @client {
// 			creatingSong
// 		}
// 		queryString @client {
// 			songs
// 		}
// 	}
// `;

// const UPDATE_SONGS_PAGE_STATE = gql`
// 	mutation UpdateSongsPageState($creatingSong: Boolean) {
// 		updateSongsPageState(creatingSong: $creatingSong) @client
// 	}
// `;

// const ADD_SELECTED_SONG_MUTATION = gql`
// 	mutation AddSelectedSong($songId: ID) {
// 		addSelectedSong(songId: $songId) @client
// 	}
// `;

// const withSongsPageState = graphql<ResponseProps>(SONGSPAGE_STATE);

// const withUpdateSongsPageState = graphql<ResponseProps>(
// 	UPDATE_SONGS_PAGE_STATE,
// 	{
// 		props: ({ mutate }) => ({
// 			updateSongsPageState: props => {
// 				return mutate({
// 					variables: props
// 				});
// 			}
// 		})
// 	}
// );

// const withAddSelectedSong = graphql<ResponseProps>(ADD_SELECTED_SONG_MUTATION, {
// 	props: ({ mutate }) => ({
// 		addSelectedSong: songId =>
// 			mutate({
// 				variables: {
// 					songId
// 				}
// 			})
// 	})
// });

// export const SongsPage = compose(
// 	withSongsPageState,
// 	withUpdateSongsPageState,
// 	withAddSelectedSong
// )((props: ResponseProps) => {
// 	if (props.data.loading) {
// 		return <h1>Ladataan...</h1>;
// 	}
// 	return (
// 		<Grid fluid={true}>
// 			<Grid>
// 				<div className="AppendBottom">
// 					{props.data.songsPageState.creatingSong ? (
// 						<CreateVariation
// 							onSuccess={() => {
// 								props.updateSongsPageState({
// 									creatingSong: false
// 								});
// 							}}
// 							onCancel={() => {
// 								props.updateSongsPageState({
// 									creatingSong: false
// 								});
// 							}}
// 						/>
// 					) : (
// 						<Button
// 							bsStyle="info"
// 							onClick={() => {
// 								props.updateSongsPageState({
// 									creatingSong: true
// 								});
// 							}}
// 						>
// 							Luo uusi laulu
// 						</Button>
// 					)}
// 				</div>
// 			</Grid>
// 			<VariationsGrid />
// 			<Row>
// 				<Col sm={6} style={{ maxWidth: "400px" }}>
// 					<SongSearchSettings />
// 				</Col>
// 				<Col sm={6}>
// 					<SongSearchResults
// 						onSongSelected={songId => {
// 							props.addSelectedSong(songId);
// 						}}
// 					/>
// 				</Col>
// 			</Row>
// 		</Grid>
// 	);
// });
