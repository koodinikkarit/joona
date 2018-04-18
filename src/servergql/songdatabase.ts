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

export const ADD_VARIATION_TO_SONG_DATABASE_MUTATION = gql`
	mutation addVariationToSongDatabase(
		$songDatabaseId: ID!
		$variationId: ID!
	) {
		addVariationToSongDatabase(
			songDatabaseId: $songDatabaseId
			variationId: $variationId
		)
	}
`;

export const REMOVE_VARIATION_FROM_SONG_DATABASE_MUTATION = gql`
	mutation removeVariationFromSongDatabase(
		$songDatabaseId: ID!
		$variationId: ID!
	) {
		removeVariationFromSongDatabase(
			songDatabaseId: $songDatabaseId
			variationId: $variationId
		)
	}
`;

export const SONG_DATABASE_VARIATIONS_QUERY = gql`
	query getSongDatabaseVariations($songDatabaseId: ID!) {
		songDatabaseVariations(songDatabaseId: $songDatabaseId) {
			totalCount
			variations {
				id
				name
			}
		}
	}
`;
