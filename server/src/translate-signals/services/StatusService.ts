/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardProcotol } from "../interfaces/DashboardProtocol";
import { DeviceProtocol } from "../interfaces/DeviceProtocol";
import { dashboardContent } from "../entities/Dashboard";
import { StatusProcol } from "../interfaces/StatusProcol";
import { CompanyProtocol } from "../interfaces/CompanyProtocol";
import moment from "moment";
export default class StatusService {
	constructor(
		private device: DeviceProtocol,
		private dashboard: DashboardProcotol,
		private status: StatusProcol,
		private company: CompanyProtocol,
	) { }

	public async create() {
		const devices = await this.device.findMany();

		for await (const device of devices) {
			const dashboard: dashboardContent[] = await this.dashboard.getAllByDeviceID(device.id);
			for await (const [contentIndex, content] of dashboard.entries()) {
				let diffMilliseconds = 0;
				const lastStatus = await this.dashboard.getLastStatus(device.id);

				if (!lastStatus.length) {
					diffMilliseconds = await this.company.currentDurationSinceStart(device.numero_serie);
					
				}

				if (contentIndex === 0 && lastStatus.length) {
					diffMilliseconds = moment(content.data_criacao, "YYYY-MM-DD HH:mm:ss").diff(moment(lastStatus[0].data_criacao, "YYYY-MM-DD HH:mm:ss"), "milliseconds");
				}

				if (contentIndex !== 0 && lastStatus.length) {
					diffMilliseconds = moment(content.data_criacao, "YYYY-MM-DD HH:mm:ss").diff(moment(dashboard[contentIndex - 1]?.data_criacao, "YYYY-MM-DD HH:mm:ss"), "milliseconds");
				}
			
				const millisecondsValidated = await this.validateDuration(device.numero_serie, diffMilliseconds);
				const status = millisecondsValidated > 300000 ? "Desligado" : "Ligado";
				const limitID = dashboard[dashboard.length - 1]?.ID;
				const currentShift = await this.company.getCurrentShift(device.numero_serie);
				if (limitID) {
					await this.status.create(content.device_fk, status, millisecondsValidated, currentShift);
					await this.dashboard.updateStatusToProcessed(limitID);
				}
			}
		}
	}

	public async validateDuration(deviceSerialNum: string, totalMiliseconds: number): Promise<number> {
		const currentDuration = await this.company.currentDurationSinceStart(deviceSerialNum);

		if (totalMiliseconds > currentDuration) {
			totalMiliseconds = currentDuration;
		}

		return totalMiliseconds;
	}
}