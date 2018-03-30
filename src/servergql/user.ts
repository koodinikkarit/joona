import gql from "graphql-tag";

export const CREATE_USER_MUTATION = gql`
	mutation registerUser(
		$userName: String!
		$password: String!
		$admin: Boolean
	) {
		registerUser(userName: $userName, password: $password, admin: $admin) {
			success
			userNameAlreadyInUse
		}
	}
`;
