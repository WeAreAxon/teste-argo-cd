import moment from "moment";
import { CompanyEntityProtocol } from "../interfaces/CompanyEntityProtocol";
import { DeviceMongo } from "../types/DeviceMongo";

export default class CompanyService {
	constructor(
		private companyEntity: CompanyEntityProtocol,
	) { }

	async getCurrentShift(numero_serie: string) {
		const company: Record<string, any> = await this.companyEntity.getBySerialNumber(numero_serie) as Record<string, any>;

		if (!company) {
			throw new Error(`Número de série não encontrado no banco de dados, n: ${numero_serie}`);
		}

		const companyDevice = company.devices.find((device: Record<string, any>) => device.serialNum === "connectv1_" + numero_serie);

		if (!companyDevice) {
			throw new Error(`Número de série não encontrado no banco de dados, n: ${numero_serie}`);
		}

		const currentTime = new Date().toISOString().slice(0, 19);
		let currentShift = 0;

		for await (const [indexShift, shift] of companyDevice.shifts.entries()) {
			const startAt = moment(shift[0], "HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
			let endAt = moment(shift[1], "HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");

			if (moment(endAt, "YYYY-MM-DD HH:mm:ss").isBefore(moment(startAt, "YYYY-MM-DD HH:mm:ss"))) {
				endAt = moment(endAt, "HH:mm:ss").add(1, "days").format("YY-MM-DD HH:mm:ss");
			}

			if (moment(currentTime, "YYYY-MM-DD HH:mm:ss")
				.isAfter(moment(startAt, "YYYY-MM-DD HH:mm:ss")) && moment(currentTime, "YYYY-MM-DD HH:mm:ss").isBefore(moment(endAt, "YYYY-MM-DD HH:mm:ss"))) {
				currentShift = indexShift + 1;
			}
		}
		
		return currentShift;
	}

	public async currentDurationSinceStart(deviceSerialNum: string) : Promise<number> {
		const company: { [key: string]: any; } = await this.companyEntity.getBySerialNumber(deviceSerialNum) || false;

		if (!company) {
			throw new Error(`Aparelho ${deviceSerialNum} não registrado no banco de dados!`);
		}
		const companyDevice = company.devices.find((device: DeviceMongo) => device.serialNum === "connectv1_" + deviceSerialNum);
		const currentShift = await this.getCurrentShift(deviceSerialNum);

		const shiftStartTime = moment(companyDevice.shifts[currentShift - 1][0], "HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
		let nowTime = moment(new Date().toISOString(), "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");

		if (moment(nowTime, "YYYY-MM-DD HH:mm:ss").isBefore(shiftStartTime)) {
			nowTime = moment(nowTime, "YYYY-MM-DD HH:mm:ss").add(1, "days").format("YYYY-MM-DD HH:mm:ss");
		}

		const differenceMilliseconds = moment(nowTime, "YYYY-MM-DD HH:mm:ss").diff(shiftStartTime, "milliseconds");
		return differenceMilliseconds;
	}	
}