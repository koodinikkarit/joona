import gql from "graphql-tag";

export const SEARCH_LANGUAGES_QUERY = gql`
	query searchLanguages($searchWord: String) {
		searchLanguages(searchWord: $searchWord) {
			totalCount
			languages {
				id
				name
			}
		}
	}
`;

export const CREATE_LANGUAGE_MUTATION = gql`
	mutation createLanguage($name: String!) {
		createLanguage(name: $name) {
			success
			language {
				id
				name
			}
		}
	}
`;

export const LANGUAGE_QUERY = gql`
	query getLanguage($languageId: ID!) {
		language(languageId: $languageId) {
			id
			name
		}
	}
`;

export const LANGUAGE_VARIATIONS_QUERY = gql`
	query getLanguageVariations($languageId: ID!) {
		languageVariations(languageId: $languageId) {
			variations {
				id
				__typename
			}
		}
	}
`;
