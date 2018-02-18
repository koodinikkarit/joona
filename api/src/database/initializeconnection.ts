import { createConnection, ConnectionOptions } from "typeorm";
import {
	mysqlHost,
	mysqlUsername,
	mysqlPassword,
	mysqlDatabaseName,
	mysqlPort
} from "../config";
import { Variation } from "../entities";
import { InitializeSchema1518825023453 } from "../migrations/1518825023453-InitializeSchema";

console.log("mysqlUsername", mysqlUsername);

export const initializeConnection = () => {
	let connectionOptions: any = {
		type: "mysql",
		host: mysqlHost,
		username: mysqlUsername,
		database: mysqlDatabaseName,
		synchronize: false,
		logging: true,
		migrationsRun: true,
		entities: [Variation],
		migrations: [InitializeSchema1518825023453]
	};

	if (mysqlPort) {
		connectionOptions.port = mysqlPort;
	}

	if (mysqlPassword) {
		connectionOptions.password = mysqlPassword;
	}

	return createConnection(connectionOptions);
};
