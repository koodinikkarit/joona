import gql from "graphql-tag";

export const readChangedVariations = gql`
	query ReadChangedVariations {
		changedVariations {
			variationId
			name
			text
			addSongDatabaseIds
			removeSongDatabases
		}
	}
`;
