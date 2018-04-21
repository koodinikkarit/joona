import gql from "graphql-tag";

export const AUTHORS_SEARCH_QUERY = gql`
	query searchAuthors($searchWord: String) {
		searchAuthors(searchWord: $searchWord) {
			authors {
				id
				name
			}
		}
	}
`;

export const CREATE_AUTHOR_MUTATION = gql`
	mutation createAuthor($name: String!) {
		createAuthor(name: $name) {
			success
			author {
				id
				name
			}
		}
	}
`;

export const AUTHOR_QUERY = gql`
	query getAuthor($authorId: ID!) {
		author(authorId: $authorId) {
			id
			name
		}
	}
`;

export const AUTHOR_VARIATIONS_QUERY = gql`
	query getAuthorVariations($authorId: ID!) {
		authorVariations(authorId: $authorId) {
			variations {
				id
			}
		}
	}
`;
