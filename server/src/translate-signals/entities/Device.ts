import { mysql } from "../../_config/database";
import { DeviceProtocol } from "../interfaces/DeviceProtocol";

export default class Device implements DeviceProtocol {
	async findMany(): Promise<{ id: number, numero_serie: string, categoria_fk: number; }[]> {
		const [serialNumberAndCategoryIdList] = await mysql.raw(`
			SELECT id, numero_serie, categoria_fk FROM DEVICE;
		`.trim());

		return serialNumberAndCategoryIdList;
	}
}

