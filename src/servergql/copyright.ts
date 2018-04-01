import gql from "graphql-tag";

export const COPYRIGHT_SEARCH_QUERY = gql`
	query searchCopyrights($searchWord: String) {
		searchCopyrights(searchWord: $searchWord) {
			copyrights {
				id
				name
			}
		}
	}
`;

export const CREATE_COPYRIGHT_MUTATION = gql`
	mutation createCopyright($name: String!) {
		createCopyright(name: $name) {
			success
			copyright {
				id
				name
			}
		}
	}
`;
