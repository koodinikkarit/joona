import gql from "graphql-tag";

export default gql`
	query searchSongDatabases($params: SearchSongDatabasesInput) {
		allSongDatabases: searchSongDatabases(params: $params) {
			songDatabases {
				id
				name
			}
			maxSongDatabases
		}
	}
`;
