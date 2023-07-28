import { mongo } from "../../_config/database";

export default class Company {
	async getBySerialNumber(numero_serie: string): Promise<{ [key: string]: any; } | null> {
		const db = mongo.db("ConnectManagement");
		const collection = db.collection("companies");
		const numeroSerie = "connectv1_" + numero_serie;

		return await collection.findOne({ devices: { $elemMatch: { serialNum: numeroSerie } } });
	}
}

