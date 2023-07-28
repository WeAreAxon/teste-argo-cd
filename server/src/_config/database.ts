/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MongoClient } from "mongodb";
import knex from "knex";

export const mongo = new MongoClient(process.env["MONGODB_URI"] as string);

export const mysql = knex({
	client: "mysql",
	connection: {
		host: process.env["MYSQL_HOST"]!,
		port: Number(process.env["MYSQL_PORT"]!),
		user: process.env["MYSQL_USER"]!,
		password: process.env["MYSQL_PASSWORD"]!,
		database: process.env["MYSQL_DATABASE"]!,
		charset: "utf8",
		timezone: "utc",
	},
	pool: { min: 2, max: 20 }
});