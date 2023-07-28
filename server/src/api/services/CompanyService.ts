import moment from "moment";
import CompanyEntity from "../entities/CompanyEntity";
import { WithId } from "mongodb";

export default class CompanyService {

	async getDatetimeShift( deviceSerialNum: string, fromDate: string, toDate: string, shift: number): Promise<void | Record<string, unknown>> {

		const company = await new CompanyEntity().getCompany(deviceSerialNum);
		const passMidnight = await this.checkIfShiftsPassMidnight(company, deviceSerialNum, shift);

		if (passMidnight) {
			deviceSerialNum = "connectv1_" + deviceSerialNum;

			if (!company) {
				throw new Error(`O dispostivo ${deviceSerialNum} não pertence a nenhuma empresa`);
			}

			const device = company.devices.find((currentDevice: Record<string, unknown>) => currentDevice.serialNum === deviceSerialNum);

			if (!device) {
				throw new Error(`Dispositivo ${deviceSerialNum} não encontrado na base de dados!`);
			}

			const startedAt = 0;
			const fineshedAt = 1;
			const indexShiftSelected = shift - 1;
			const startAtTime = moment(device.shifts[indexShiftSelected][startedAt], "HH:mm:ss").format("HH:mm:ss");
			const endAtTime = moment(device.shifts[indexShiftSelected][fineshedAt], "HH:mm:ss").format("HH:mm:ss");
			const startAtDatetime = new Date(fromDate).toDateString() + " " + startAtTime;
			const endAtDatetime = new Date(toDate).toDateString() + " " + endAtTime;

			return {
				fromTime: startAtDatetime,
				toTime: endAtDatetime,
				passMidnight,
			};
		}
	}

	async checkIfShiftsPassMidnight(company: WithId<Record<string, any>> | null, deviceSerialNum: string, shift: number) {
		if (!company) {
			throw new Error("Empresa não cadastrada no banco de dados");
		}

		const devices = company.devices;
		const device = devices.find((device: Record<string, any>) => device.serialNum === "connectv1_" + deviceSerialNum);

		if (!device) {
			throw new Error("Dispositivo não encontrado");
		}

		const shiftSelected = device.shifts[shift - 1];
		let passMidnight = false;

		for (const times of shiftSelected) {
			const startAt = moment(times[0], "HH:mm:ss").format("HH:mm:ss");
			const endAt = moment(times[1], "HH:mm:ss").format("HH:mm:ss");

			if (moment(endAt, "HH:mm:ss").isBefore(moment(startAt, "HH:mm:ss"))) {
				passMidnight = true;
			}
		}

		return passMidnight;
	}

	async getShiftDurationMilliseconds(deviceSerialNum: string, shift: number, fromDate: string, toDate: string) {
		const company = await new CompanyEntity().getCompany(deviceSerialNum);
		if (!company) {
			throw new Error(" A empresa não foi encontrada!");
		}

		const companyDevice = company.devices.find((device: Record<string, any>) => device.serialNum === "connectv1_" + deviceSerialNum);


		if (!companyDevice) {
			throw new Error("Dispositivo não encotrando");
		}

		let daysBetweenDates = 1;
		const oneDayMilliseconds = 86400000;

		if (fromDate !== toDate && shift as number === 0) {
			daysBetweenDates = moment(toDate, "YYYY-MM-DD").diff(fromDate, "days");

			return oneDayMilliseconds * daysBetweenDates;
		}
		
		const currentDatetime = moment(new Date().toISOString(), "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");

		if (fromDate === toDate && Number(shift) === 0) {
			const midnight = moment("00:00:00", "HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
			return moment(currentDatetime, "YYYY-MM-DD HH:mm:ss").diff(midnight, "milliseconds");
		}

		const shiftSelected: string[] = companyDevice.shifts[shift - 1];

		let startDatetime = moment(shiftSelected[0], "HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
		const endDatetime = moment(shiftSelected[1], "HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");

		if (moment(endDatetime, "YYYY-MM-DD HH:mm:ss").isBefore(startDatetime)) {
			startDatetime = moment(startDatetime, "YYYY-MM-DD HH:mm:ss").subtract(1, "days").format("YYYY-MM-DD HH:mm:ss");
		}

		let duration = moment(currentDatetime).diff(startDatetime, "milliseconds");

		if (moment(currentDatetime).isAfter(endDatetime) || fromDate !== toDate) {
			duration = moment(endDatetime).diff(startDatetime, "milliseconds");
		}

		return duration * daysBetweenDates;
	}
}