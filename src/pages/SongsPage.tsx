import * as React from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

import { Grid, Row, Col, Button } from "react-bootstrap";

import { CreateVariation } from "../songs";

import {
	VariationsGrid,
	SongSearchSettings,
	SongSearchResults
} from "../songs";

type ResponseProps = {
	data?: {
		loading: boolean;
		songsPageState?: {
			creatingSong: boolean;
		};
	};
	updateSongsPageState?: (
		props: {
			creatingSong: boolean;
		}
	) => void;
	addSelectedSong?: (songId: number) => void;
	removeSelectedSong?: (songId: number) => void;
};

const SONGSPAGE_STATE = gql`
	query ReadSongsPageState {
		songsPageState @client {
			creatingSong
		}
		queryString @client {
			songs
		}
	}
`;

const UPDATE_SONGS_PAGE_STATE = gql`
	mutation UpdateSongsPageState($creatingSong: Boolean) {
		updateSongsPageState(creatingSong: $creatingSong) @client
	}
`;

const ADD_SELECTED_SONG_MUTATION = gql`
	mutation AddSelectedSong($songId: ID) {
		addSelectedSong(songId: $songId) @client
	}
`;

const withSongsPageState = graphql<ResponseProps>(SONGSPAGE_STATE);

const withUpdateSongsPageState = graphql<ResponseProps>(
	UPDATE_SONGS_PAGE_STATE,
	{
		props: ({ mutate }) => ({
			updateSongsPageState: props => {
				return mutate({
					variables: props
				});
			}
		})
	}
);

const withAddSelectedSong = graphql<ResponseProps>(ADD_SELECTED_SONG_MUTATION, {
	props: ({ mutate }) => ({
		addSelectedSong: songId =>
			mutate({
				variables: {
					songId
				}
			})
	})
});

export const SongsPage = compose(
	withSongsPageState,
	withUpdateSongsPageState,
	withAddSelectedSong
)((props: ResponseProps) => {
	if (props.data.loading) {
		return <h1>Ladataan...</h1>;
	}
	return (
		<Grid fluid={true}>
			<Grid>
				<div className="AppendBottom">
					{props.data.songsPageState.creatingSong ? (
						<CreateVariation
							onSuccess={() => {
								props.updateSongsPageState({
									creatingSong: false
								});
							}}
							onCancel={() => {
								props.updateSongsPageState({
									creatingSong: false
								});
							}}
						/>
					) : (
						<Button
							bsStyle="info"
							onClick={() => {
								props.updateSongsPageState({
									creatingSong: true
								});
							}}
						>
							Luo uusi laulu
						</Button>
					)}
				</div>
			</Grid>
			<VariationsGrid />
			<Row>
				<Col sm={6} style={{ maxWidth: "400px" }}>
					<SongSearchSettings />
				</Col>
				<Col sm={6}>
					<SongSearchResults
						onSongSelected={songId => {
							props.addSelectedSong(songId);
						}}
					/>
				</Col>
			</Row>
		</Grid>
	);
});
