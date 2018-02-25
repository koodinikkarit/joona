import { createConnection, ConnectionOptions } from "typeorm";
import {
	mysqlHost,
	mysqlUsername,
	mysqlPassword,
	mysqlDatabaseName,
	mysqlPort
} from "../config";
import { Variation, User } from "../entities";
import { InitializeSchema1518825023453 } from "../migrations/1518825023453-InitializeSchema";
import { AddUSersTable1519559635038 } from "../migrations/1519559635038-AddUSersTable";

export const initializeConnection = () => {
	let connectionOptions: any = {
		type: "mysql",
		host: mysqlHost,
		username: mysqlUsername,
		database: mysqlDatabaseName,
		synchronize: false,
		logging: true,
		migrationsRun: true,
		entities: [Variation, User],
		migrations: [InitializeSchema1518825023453, AddUSersTable1519559635038]
	};

	if (mysqlPort) {
		connectionOptions.port = mysqlPort;
	}

	if (mysqlPassword) {
		connectionOptions.password = mysqlPassword;
	}

	console.log("connectionOptions", connectionOptions);

	return createConnection(connectionOptions);
};
