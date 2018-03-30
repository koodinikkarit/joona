import gql from "graphql-tag";

export const NAVIGATION_BAR_VIEWER = gql`
	query getNavigationBarViewer {
		viewer {
			id
			user {
				id
				userName
			}
			adminInitialized
		}
	}
`;
