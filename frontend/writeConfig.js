const fs = require("fs");
const path = require("path");

const API_PORT = process.env.API_PORT;
const API_HTTPS_PORT = process.env.API_HTTPS_PORT;
const API_IP = process.env.API_IP;

const config = `
window.config = {
	API_IP: ${API_IP ? `"${API_IP}"` : "null"},
	API_PORT: ${API_PORT || 80},
	API_HTTPS_PORT: ${API_HTTPS_PORT || 443}
};
`;

// console.log("Writeconfig");

// module.exports = nodeEnv => {
// 	if (nodeEnv === "development") {
// 		fs.writeFileSync(path.join(__dirname, "public", "config.js"), config);
// 	} else {
// 		fs.writeFileSync(path.join(__dirname, "build", "config.js"), config);
// 	}
// };

fs.writeFileSync(path.join(__dirname, "public", "config.js"), config);
