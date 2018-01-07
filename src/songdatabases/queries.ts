import { SongDatabaseType } from "../types";
import gql from "graphql-tag";

export type SearchSongDatabasesQueryResponseType = {
	allSongDatabases: {
		maxSongDatabases: number;
		songDatabases: SongDatabaseType[];
	};
};

export const searchSongDatabasesQuery = gql`
	query searchSongDatabases {
		allSongDatabases: searchSongDatabases {
			maxSongDatabases
			songDatabases {
				id
				name
			}
		}
	}
`;
