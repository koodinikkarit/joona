import gql from "graphql-tag";

import { ApolloCache } from "apollo-cache";

import {
	ControlMatiasClientStateType,
	CreateEwDatabaseState,
	SongsPageStateType,
	CreateVariationStateType,
	QueryStringType
} from "./types";
import { ChangedVariationType } from "./index";
import { readChangedVariations } from "./gql";

const readControlMatiasClientQuery = gql`
	query readControlMatiasClient {
		controlMatiasClientState @client {
			creatingEwDatabase
		}
	}
`;

const readCreateEwDatabaseStateQuery = gql`
	query readCreateEwDatabaseState {
		createEwDatabaseState @client {
			name
			filesystemPath
			songDatabaseId
		}
	}
`;

const readSongsPageStateQuery = gql`
	query readSongsPageStateQuery {
		songsPageState @client {
			creatingSong
		}
	}
`;

const readCreateVariationStateQuery = gql`
	query readCreateVariationState {
		createVariationState @client {
			name
			text
		}
	}
`;

const readQueryString = gql`
	query readQueryString @client {
		queryString {
			songs
		}
	}
`;

type CacheContainer = {
	cache: ApolloCache<any>;
};

export const resolvers = {
	Query: {
		controlMatiasClients(
			root: any,
			{},
			{
				cache
			}: {
				cache: ApolloCache<any>;
			}
		) {
			let data: {
				controlMatiasClientState: ControlMatiasClientStateType;
			} = cache.readQuery({
				query: readControlMatiasClientQuery
			});

			return data.controlMatiasClientState;
		},
		changedVariations(
			root: any,
			args: {
				variationId: string;
			},
			cacheContainer: CacheContainer
		) {
			let data: {
				changedVariations: ChangedVariationType[];
			} = cacheContainer.cache.readQuery({
				query: readChangedVariations
			});
			console.log("data", data, args);
			if (data.changedVariations.length === 0) {
				return {
					variation: args.variationId,
					name: "makkara",
					text: "peruna",
					addSongDatabaseIds: [],
					removeSongDatabaseIds: [],
					__typename: "ChangedVariation"
				};
			}
			return data.changedVariations.find(
				p => p.variationId === args.variationId
			);
		}
	},
	Mutation: {
		setSearchSongDatabasesSearchWord() {},
		updateControlMatiasState(
			root: any,
			args: {
				creatingEwDatabase: boolean;
			},
			cache: CacheContainer
		) {
			let data: {
				controlMatiasClientState: ControlMatiasClientStateType;
			} = cache.cache.readQuery({
				query: readControlMatiasClientQuery
			});
			data.controlMatiasClientState.creatingEwDatabase =
				args.creatingEwDatabase;
			cache.cache.writeData({
				data
			});
		},
		updateCreateEwDatabaseState(
			root: any,
			args: {
				name: string;
				filesystemPath: string;
				songDatabaseId: number;
			},
			{ cache }: CacheContainer
		) {
			let data: {
				createEwDatabaseState: CreateEwDatabaseState;
			} = cache.readQuery({
				query: readCreateEwDatabaseStateQuery
			});
			if (args.name) {
				data.createEwDatabaseState.name = args.name;
			}
			if (args.filesystemPath) {
				data.createEwDatabaseState.filesystemPath = args.filesystemPath;
			}
			if (args.songDatabaseId) {
				data.createEwDatabaseState.songDatabaseId = args.songDatabaseId;
			}
			cache.writeData({
				data
			});
		},
		updateSongsPageState(
			root: any,
			args: {
				creatingSong: boolean;
			},
			cache: CacheContainer
		) {
			let data: {
				songsPageState: SongsPageStateType;
			} = cache.cache.readQuery({
				query: readSongsPageStateQuery
			});

			if (args.creatingSong != null) {
				data.songsPageState.creatingSong = args.creatingSong;
			}
			cache.cache.writeData({
				data
			});
		},
		updateCreateVariationState(
			root: any,
			args: {
				name: string;
				text: string;
			},
			cacheContainer: CacheContainer
		) {
			let data: {
				createVariationState: CreateVariationStateType;
			} = cacheContainer.cache.readQuery({
				query: readCreateVariationStateQuery
			});

			if (args.name !== "") {
				data.createVariationState.name = args.name;
			}
			if (args.text !== "") {
				data.createVariationState.text = args.text;
			}
			cacheContainer.cache.writeData({
				data
			});
		},
		addSelectedSong(
			root: any,
			args: {
				songId: number;
			},
			cacheContainer: CacheContainer
		) {
			let data: {
				queryString: QueryStringType;
			} = cacheContainer.cache.readQuery({
				query: readQueryString
			});
			if (!data.queryString.songs.some(p => p === args.songId)) {
				data.queryString.songs = [
					...data.queryString.songs,
					args.songId
				];
				cacheContainer.cache.writeData({
					data
				});
			}
		},
		removeSelectedSong(
			root: any,
			args: {
				songId: number;
			},
			cacheContainer: CacheContainer
		) {
			let data: {
				queryString: QueryStringType;
			} = cacheContainer.cache.readQuery({
				query: readQueryString
			});
			data.queryString.songs = data.queryString.songs.filter(
				p => p !== args.songId
			);
			cacheContainer.cache.writeData({
				data
			});
		},
		updateVariationState(
			root: any,
			args: {
				variationId: string;
				name: string;
				text: string;
				addSongDatabaseIds: string;
				removeSongDatabaseIds: string;
			},
			cacheContainer: CacheContainer
		) {
			let data: {
				changedVariations: ChangedVariationType[];
			} = cacheContainer.cache.readQuery({
				query: readChangedVariations
			});

			const sameChangedVariation = data.changedVariations.find(
				p => p.variationId === args.variationId
			);
			const newChangedVariation = {
				name: args.name
					? args.name
					: sameChangedVariation ? sameChangedVariation.name : "",
				text: args.text
					? args.text
					: sameChangedVariation ? sameChangedVariation.text : "",
				addSongDatabaseIds: args.addSongDatabaseIds
					? args.addSongDatabaseIds
					: sameChangedVariation.addSongDatabaseIds
						? sameChangedVariation.addSongDatabaseIds
						: [],
				removeSongDatabaseIds: args.removeSongDatabaseIds
					? args.removeSongDatabaseIds
					: sameChangedVariation.removeSongDatabaseIds
						? sameChangedVariation.removeSongDatabaseIds
						: [],
				__typename: "ChangedVariation"
			};

			data.changedVariations.map(p => {
				if (p.variationId !== args.variationId) {
					return p;
				}
				return newChangedVariation;
			});

			cacheContainer.cache.writeData({
				data
			});
		}
	}
};
