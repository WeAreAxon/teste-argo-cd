import { mysql } from "../../_config/database";

export default class SignalEntity {
	async create(deviceID: number, switches: string) {
		const [rows] = await mysql.raw(`
		INSERT INTO SIGNALS (device_fk, signals)
		VALUES('${deviceID}', '${switches}')
		`.trim());

		return rows;
	}


}