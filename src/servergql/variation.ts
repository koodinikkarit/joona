import gql from "graphql-tag";

export const CREATE_VARIATION_MUTATION = gql`
	mutation createVariation($name: String!, $text: String) {
		createVariation(name: $name, text: $text) {
			id
			name
			text
		}
	}
`;

export const SEARCH_VARIATIONS_QUERY = gql`
	query searchVariations($searchWord: String) {
		searchVariations(searchWord: $searchWord) {
			variations {
				id
				name
				text
			}
		}
	}
`;

export const VARIATION_QUERY = gql`
	query getVariation($variationId: ID!) {
		variation(variationId: $variationId) {
			id
			name
			text
			author {
				id
				name
			}
		}
	}
`;

export const UPDATE_VARIATION_MUTATION = gql`
	mutation updateVariation($params: UpdateVariationInputType) {
		updateVariation(params: $params) {
			success
			variation {
				id
				name
				text
			}
		}
	}
`;

export const ADD_TAG_TO_VARIATION = gql`
	mutation addTagToVariation($variationId: ID!, $tagId: ID!) {
		addTagToVariation(variationId: $variationId, tagId: $tagId)
	}
`;

export const REMOVE_TAG_FROM_VARIATION = gql`
	mutation removeTagFromVariation($variationId: ID!, $tagId: ID!) {
		removeTagFromVariation(variationId: $variationId, tagId: $tagId)
	}
`;

export const VARIATION_SONG_DATABASES_QUERY = gql`
	query getVariationSongDatabases($variationId: ID!) {
		variationSongDatabases(variationId: $variationId) {
			songDatabases {
				id
			}
		}
	}
`;
