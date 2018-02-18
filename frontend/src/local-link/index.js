import { withClientState } from "apollo-link-state";
import gql from "graphql-tag";

import clone from "clone";

import cache from "../cache";

const readSelectedSongDatabasesQuery = gql`
	query readGrid {
		grid @client {
			selectedSongDatabases
		}
	}
`;

export default withClientState({
	cache,
	resolvers: {
		Mutation: {
			addSelectedSongDatabase: (_, { songDatabaseId }, { cache }) => {
				let data = cache.readQuery({
					query: readSelectedSongDatabasesQuery
				});
				if (
					!data.grid.selectedSongDatabases.some(
						p => p === songDatabaseId
					)
				) {
					// console.log(
					// 	"lisätään",
					// 	songDatabaseId,
					// 	data.grid.selectedSongDatabases
					// );
					//let newData = clone(data);
					//newData.grid.selectedSongDatabases.push(songDatabaseId);
					//console.log("newData", newData);
					//data.grid.selectedSongDatabases.push(songDatabaseId);
					data.grid.selectedSongDatabases = [
						...data.grid.selectedSongDatabases,
						songDatabaseId
					];

					cache.writeData({
						query: readSelectedSongDatabasesQuery,
						data: data
					});
				}
			}
		}
	},
	defaults: {
		grid: {
			__typename: "Grid",
			selectedSongDatabases: []
		}
	}
});
