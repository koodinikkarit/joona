import gql from "graphql-tag";

export const USER_LOGOUT_MUTATION = gql`
	mutation logout {
		logout {
			success
		}
	}
`;
