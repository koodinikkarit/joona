import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import { graphqlExpress, graphiqlExpress } from "apollo-server-express";

import { initializeConnection } from "./database/initializeconnection";
import { schema } from "./schema";
import { httpPort } from "./config";
import { prepareDatabase } from "./preparedatabase";

import * as config from "./config";

console.log("config", config);

export const Main = async () =>
	new Promise(async (resolve, reject) => {
		console.log("asd");
		await prepareDatabase();
		await initializeConnection();

		const app = express();

		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(
			bodyParser.json({
				limit: "5mb"
			})
		);
		app.use(
			cors({
				origin: true,
				credentials: true
			})
		);

		app.use(
			"/graphql",
			async (req: express.Request, res: express.Response, next) => {
				graphqlExpress({
					schema: schema
				})(req, res, next);
			}
		);

		app.use(
			"/graphiql",
			graphiqlExpress({
				endpointURL: "/graphql"
			})
		);

		app.listen(httpPort, () => {
			console.log("Listening port ", httpPort);
			resolve();
		});
	});

Main();
