import DeviceEntity from "../entities/DeviceEntity";
import CardService from "./CardService";

export default class DeviceService {
	async getAll(companyEmail: string) {
		const [rows] = await new DeviceEntity().getAll(companyEmail);

		if (!rows.length) {
			throw new Error("A empresa não possui nenhum dispositivo cadastrado!");
		}

		for await (const device of rows) {
			const currentDeviceStatus = await new CardService().getCurrentStatus(device.id);
			device.status = currentDeviceStatus.boolean;
		}

		return rows;
	}
}