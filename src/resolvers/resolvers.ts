import gql from "graphql-tag";

import { ApolloCache } from "apollo-cache";

import { ControlMatiasClientStateType, CreateEwDatabaseState } from "./types";

const readControlMatiasClientQuery = gql`
	query readControlMatiasClient {
		controlMatiasClientState @client {
			creatingEwDatabase
		}
	}
`;

const readCreateEwDatabaseStateQuery = gql`
	query readCreateEwDatabaseState {
		createEwDatabaseState {
			name
			filesystemPath
			songDatabaseId
		}
	}
`;

type CacheParameter = {
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
		}
	},
	Mutation: {
		setSearchSongDatabasesSearchWord() {},
		updateControlMatiasState(
			root: any,
			args: {
				creatingEwDatabase: boolean;
			},
			cache: CacheParameter
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
			{ cache }: CacheParameter
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
		}
	}
};
