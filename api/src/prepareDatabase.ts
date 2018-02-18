import { createConnection } from "mysql";

import {
	mysqlDatabaseName,
	mysqlHost,
	mysqlPassword,
	mysqlPort,
	mysqlUsername
} from "./config";

export const prepareDatabase = () =>
	new Promise((resolve, reject) => {
		const tryToConnect = () => {
			const connection = createConnection({
				host: mysqlHost,
				user: mysqlUsername,
				password: mysqlPassword,
				port: mysqlPort
			});

			connection.connect(err => {
				if (!err) {
					console.log("Mysql connection success");
					connection.query(
						`create database if not exists ${mysqlDatabaseName}`,
						err => {
							console.log("create database query redy");
							connection.destroy();
							if (!err) {
								console.log("success");
								resolve();
							} else {
								console.log("failed");
								reject(err);
							}
						}
					);
					return;
				}
				console.log("error in connecting to mysql server", err);
				setTimeout(() => {
					tryToConnect();
				}, 3000);
			});
		};
		tryToConnect();
	});
