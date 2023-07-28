import { mongo } from "../../_config/database";

export default class CompanyEntity {

	async getCompany(numero_serie: string) {
		const db = mongo.db("ConnectManagement");
		const collection = db.collection("companies");

		return await collection.findOne({ devices: { $elemMatch: {serialNum: "connectv1_" + numero_serie}} });
	}

}