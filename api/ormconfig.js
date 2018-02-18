module.exports = {
	type: "mysql",
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	entities: ["dist/entities/**/*.js"],
	migrations: ["dist/migrations/**/*.js"],
	synchronize: false,
	logging: true,
	cli: {
		entitiesDir: "src/entities/**/*.js",
		migrationsDir: "src/migrations"
	}
};
