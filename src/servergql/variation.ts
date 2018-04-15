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
	query searchVariations {
		searchVariations {
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
		}
	}
`;
