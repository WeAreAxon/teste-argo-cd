import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "node:path";
import Table from "./migrations/DatabaseMigration";
import { mysql } from "../_config/database";

import { router } from "./router";

const requiredEnvVariables = [
	"NODE_ENV",
	"PORT_API_CAPTURE",
	"MYSQL_HOST",
	"MYSQL_PORT",
	"MYSQL_USER",
	"MYSQL_PASSWORD",
	"MYSQL_DATABASE",
	"MONGODB_URI",
	"JWT_SECRET",
	"NODEMAILER_USER",
	"NODEMAILER_PASS"
];

requiredEnvVariables.forEach(key => {
	const envKeys = Object.keys(process.env);
	if (!envKeys.includes(key)) {
		console.log(`Está faltando a variável de ambiente ${key}`);
		process.exit(1);
	}
});

const PORT = process.env["PORT_API_CAPTURE"];
const app = express();

app.use(express.static(path.join(__dirname, "../../static")));

app.get("/dashboard", (_req, res) => {
	res.sendFile(path.join(__dirname, "../../static/index.html"));
});

app.use(express.json());
app.use(cors({
	origin: true,
	credentials: true
}));

app.use(helmet());
app.use(cookieParser());

app.use("/api/v2", router);


mongoose.set("strictQuery", true);

try {

	(async function createDatabase() {
		await mysql.raw("CREATE DATABASE IF NOT EXISTS `" + process.env.MYSQL_DATABASE + "`");
		await Table.tableExists();

	})().then(() => {
		mongoose.connect(process.env["MONGODB_URI"] as string)
			.then(() => console.log("Conectado ao banco"))
			.then(() => {
				app.listen(PORT, () => {
					console.log(`Server rodando na porta ${PORT}`);
				});
			});
	});
}
catch (err) {
	console.log("Não foi possível iniciar o servidor.");
}

