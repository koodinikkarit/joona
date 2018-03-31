import gql from "graphql-tag";

export const VIEWER_BASE_FRAGMENT = gql`
	fragment ViewerBase on Viewer {
		token
		user {
			id
			userName
		}
		hasAdminUser
	}
`;
