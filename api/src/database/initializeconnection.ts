import { createConnection } from "typeorm";
import {
	mysqlHost,
	mysqlUsername,
	mysqlPassword,
	mysqlDatabaseName
} from "../config";
import { Variation } from "../entities";
import { InitializeSchema1518825023453 } from "../migrations/1518825023453-InitializeSchema";

console.log("mysqlUsername", mysqlUsername);

export const initializeConnection = () => {
	return createConnection({
		type: "mysql",
		host: mysqlHost,
		username: mysqlUsername,
		password: mysqlPassword,
		database: mysqlDatabaseName,
		synchronize: false,
		logging: true,
		migrationsRun: true,
		entities: [Variation],
		migrations: [InitializeSchema1518825023453]
	});
};
