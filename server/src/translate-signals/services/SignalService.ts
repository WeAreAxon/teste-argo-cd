import { CategoryProtocol } from "../interfaces/CategoryProcol";
import { CompanyProtocol } from "../interfaces/CompanyProtocol";
import { DashboardProcotol } from "../interfaces/DashboardProtocol";
import { DeviceProtocol } from "../interfaces/DeviceProtocol";
import { SignalProtocol } from "../interfaces/SignalProcol";
import Equality from "../utils/Equality";

export default class SignalService {
	constructor(
		private device: DeviceProtocol,
		private category: CategoryProtocol,
		private signal: SignalProtocol,
		private dashboard: DashboardProcotol,
		private company: CompanyProtocol
	) { }

	public async compare() {
		const deviceList: Record<string, any>[] = await this.device.findMany();
		let allActions = 0;
		let deviceId;

		for await (const device of deviceList) {
			const catalogSignalsByCategory = await this.category.get(device.categoria_fk);
			const signalsToBeCompared = await this.signal.findById(device.id);
			const equalityCases = await Equality.check(signalsToBeCompared, catalogSignalsByCategory);
			allActions = equalityCases.actionCount;
			deviceId = device.id;
	
			await this.signal.updateStatusToProcessed("Processado", equalityCases.id, deviceId);
			
			if (allActions > 0) {
				const currentShift = await this.company.getCurrentShift(device.numero_serie);
				await this.dashboard.insertAction(deviceId, allActions, device.categoria_fk, currentShift);
			}
			allActions = 0;
		}

	}


}