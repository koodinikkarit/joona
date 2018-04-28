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
	query getSongDatabaseVariationsData(
		$songDatabaseId: ID!
		$searchWord: String
	) {
		songDatabaseVariations(songDatabaseId: $songDatabaseId) {
			totalCount
			variations {
				id
				__typename
			}
		}
		searchVariations(searchWord: $searchWord) {
			totalCount
			variations {
				id
				name
			}
		}
	}
`;

export const CREATE_SONG_DATABASE = gql`
	mutation createSongDatabase($name: String) {
		createSongDatabase(name: $name) {
			id
			name
		}
	}
`;

export const SONG_DATABASE_TAGS = gql`
	query getSongDatabaseTags($songDatabaseId: ID!) {
		songDatabaseTags(songDatabaseId: $songDatabaseId) {
			totalCount
			tags {
				id
				__typename
			}
		}
	}
`;

export const ADD_TAG_TO_SONG_DATABASE = gql`
	mutation addTagToSongDatabase($songDatabaseId: ID!, $tagId: ID!) {
		addTagToSongDatabase(songDatabaseId: $songDatabaseId, tagId: $tagId)
	}
`;

export const REMOVE_TAG_FROM_SONG_DATABASE = gql`
	mutation removeTagFromSongDatabase($songDatabaseId: ID!, $tagId: ID!) {
		removeTagFromSongDatabase(
			songDatabaseId: $songDatabaseId
			tagId: $tagId
		)
	}
`;
