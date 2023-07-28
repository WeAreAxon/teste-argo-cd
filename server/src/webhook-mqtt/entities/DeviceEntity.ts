import { mysql } from "../../_config/database";

export default class DeviceEntity {
	async findOne(numero_serie: string) {
		const [row] = await mysql.raw(`
		SELECT ID FROM DEVICE WHERE numero_serie = '${numero_serie}';
		`.trim());
		return row;

	}
}