import { mysql } from "../../_config/database";

export default class DeviceEntity {
	async getAll(companyEmail: string) {

		return await mysql.raw(`
			SELECT id, numero_serie, apelido, email_proprietaria FROM DEVICE WHERE email_proprietaria = '${companyEmail}';
		`.trim());
	}

	async getBySerialNumber(numero_serie: string) {
		
		return await mysql.raw(`
			SELECT * FROM DEVICE WHERE numero_serie = '${numero_serie}';
		`.trim());
	}
}