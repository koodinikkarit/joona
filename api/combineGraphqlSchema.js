const fs = require("fs");
const path = require("path");

fs.writeFileSync(path.join(__dirname, "schema.gql"), "");

fs.readdirSync(path.join(__dirname, "src/", "gqlfiles")).forEach(fileName => {
	const content = fs.readFileSync(
		path.join(__dirname, "src", "gqlfiles", fileName),
		{
			encoding: "utf8"
		}
	);
	if (content) {
		fs.appendFileSync(path.join(__dirname, "schema.gql"), content, {
			encoding: "utf8"
		});
	}
});
