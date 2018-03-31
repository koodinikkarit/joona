import gql from "graphql-tag";
import { VIEWER_BASE_FRAGMENT } from "./viewer";
// import { VIEWER_BASE_FRAGMENT } from ".";
// import { VIEWER_BASE_FRAGMENT } from ".";

// export const VIEWER_BASE_FRAGMENT = gql`
// 	fragment ViewerBase on Viewer {
// 		token
// 		user {
// 			id
// 			userName
// 		}
// 		hasAdminUser
// 	}
// `;

export const PAGE_VIEWER_QUERY = gql`
	query getPageViewer {
		viewer {
			...ViewerBase
		}
	}

	${VIEWER_BASE_FRAGMENT}
`;
