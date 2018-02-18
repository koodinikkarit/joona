const express = require("express");
const path = require("path");
const fs = require("fs");

console.log("PETRI_IP", process.env.PETRI_IP);
console.log("PETRI_PORT", process.env.PETRI_PORT);
console.log("HTTP_PORT", process.env.HTTP_PORT);

fs.writeFileSync(
	path.join(__dirname, "build", "configuration.js"),
	`
window.config = {
	PETRI_IP: "${process.env.PETRI_IP}",
	PETRI_PORT: ${process.env.PETRI_PORT}
};`
);

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.HTTP_PORT || 8080, () => {
	console.log("Listening on port ", process.env.HTTP_PORT || 8080);
});
