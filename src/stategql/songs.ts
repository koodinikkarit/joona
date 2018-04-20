import gql from "graphql-tag";

export const SONGS_SEARCH_WORD_QUERY = gql`
	query getSongsSearchWord {
		songsSearchWord @client
	}
`;
