import gql from "graphql-tag";
import { VIEWER_BASE_FRAGMENT } from "./viewer";

export const USER_LOGOUT_MUTATION = gql`
	mutation logout {
		logout {
			success
			viewer {
				...ViewerBase
			}
		}
	}
	${VIEWER_BASE_FRAGMENT}
`;

export const USER_LOGIN_MUTATION = gql`
	mutation login(
		$username: String!
		$password: String!
		$rememberMe: Boolean
	) {
		login(
			username: $username
			password: $password
			rememberMe: $rememberMe
		) {
			success
			user {
				id
				userName
			}
			viewer {
				...ViewerBase
			}
		}
	}
	${VIEWER_BASE_FRAGMENT}
`;
