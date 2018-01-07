export type ControlMatiasClientStateType = {
	creatingEwDatabase: boolean;
};

export type CreateEwDatabaseState = {
	name: string;
	filesystemPath: string;
	songDatabaseId: number;
};
