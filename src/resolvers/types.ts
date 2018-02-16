export type ControlMatiasClientStateType = {
	creatingEwDatabase: boolean;
};

export type CreateEwDatabaseState = {
	name: string;
	filesystemPath: string;
	songDatabaseId: number;
};

export type SongsPageStateType = {
	creatingSong: boolean;
};

export type CreateVariationStateType = {
	name: string;
	text: string;
};

export type QueryStringType = {
	songs: number[];
};

export type ChangedVariationType = {
	variationId: string;
	name: string;
	text: string;
	addSongDatabaseIds: string[];
	removeSongDatabaseIds: string[];
};
