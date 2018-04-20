import { InMemoryCache } from "apollo-cache-inmemory";

export const resolvers = {
	Mutation: {
		changeSongsSearchWord: (
			_,
			args,
			context: {
				cache: InMemoryCache;
			}
		) => {
			context.cache.writeData({
				data: {
					songsSearchWord: args.searchWord
				}
			});
		}
	}
};
