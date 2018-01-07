import { parse } from "query-string";

type QueryStringType = {
	songs: number[];
	songDatabase: number;
};

const parsed: QueryStringType = parse(location.search, {
	arrayFormat: "bracket"
});

export const defaults = {
	queryString: {
		songs: parsed.songs ? parsed.songs : [],
		songDatabase: parsed.songDatabase ? parsed.songDatabase : null,
		__typename: "QueryString"
	},
	controlMatiasClientState: {
		creatingEwDatabase: false,
		__typename: "ControlMatiasClientState"
	},
	createEwDatabaseState: {
		name: "",
		filesystemPath: "",
		songDatabaseId: 0,
		__typename: "CreateEwDatabaseState"
	}
};
