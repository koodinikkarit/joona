import gql from "graphql-tag";

export const SONG_DATABASES_QUERY = gql`
	query getSongDatabases {
		searchSongDatabases {
			totalCount
			songDatabases {
				id
				name
			}
		}
	}
`;

export const SONG_DATABASE_QUERY = gql`
	query getSongDatabase($songDatabaseId: ID!) {
		songDatabase(songDatabaseId: $songDatabaseId) {
			id
			name
		}
	}
`;
