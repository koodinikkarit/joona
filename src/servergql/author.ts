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
