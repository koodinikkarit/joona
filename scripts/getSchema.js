const path = require("path");
const execSync = require("child_process").execSync;

const petriIp = process.env.PETRI_IP;
const petriPort = process.env.PETRI_PORT;
const petriAddress = petriIp + ":" + petriPort;

const getShcemaCommand = `apollo-codegen introspect-schema http://${petriIp}:${petriPort} --output schema.json`;
execSync(getShcemaCommand);
