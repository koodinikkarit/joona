import express from "express";
import path from "path";
import bodyParser from "body-parser";
import serve from "./serve";

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/static", express.static("public"));

app.use("/js/app.js", (req, res) => {
	res.sendFile(path.join(process.cwd(), "app.js"));
});

serve(app);
