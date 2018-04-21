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

export const TAG_QUERY = gql`
	query getTag($tagId: ID!) {
		tag(tagId: $tagId) {
			id
			name
		}
	}
`;

export const VARIATION_TAGS = gql`
	query variationTags($variationId: ID!) {
		variationTags(variationId: $variationId) {
			totalCount
			tags {
				id
			}
		}
	}
`;

export const TAG_VARIATIONS_QUERY = gql`
	query getTagVariations($tagId: ID!) {
		tagVariations(tagId: $tagId) {
			totalCount
			variations {
				id
				name
			}
		}
	}
`;
