import gql from "graphql-tag";

export const CREATE_TAG_MUTATION = gql`
	mutation createTag($name: String!) {
		createTag(name: $name) {
			success
			tag {
				id
				name
			}
		}
	}
`;

export const SEARCH_TAGS_QUERY = gql`
	query searchTags($searchWord: String) {
		searchTags(searchWord: $searchWord) {
			totalCount
			tags {
				id
				name
			}
		}
	}
`;
