import gql from "graphql-tag";

export const CREATE_EW_DATABASE_MUTATION = gql`
	mutation createEwDatabase($name: String!) {
		createEwDatabase(name: $name) {
			id
			name
		}
	}
`;

export const EW_DATABASES_QUERY = gql`
	query getEwDatabases {
		searchEwDatabases {
			totalCount
			ewDatabases {
				id
				name
			}
		}
	}
`;

export const EW_DATABASE_QUERY = gql`
	query getEwDatabase($ewDatabaseId: ID!) {
		ewDatabase(ewDatabaseId: $ewDatabaseId) {
			id
			name
		}
	}
`;
