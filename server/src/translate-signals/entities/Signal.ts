import { mysql } from "../../_config/database";
import { SignalProtocol } from "../interfaces/SignalProcol";

export default class Signal implements SignalProtocol {
	async findById(id: number): Promise<Signals[]> {
		const [signalsList] = await mysql.raw(`
			SELECT 
			ID as id,
			device_fk,
			signals,
			data_criacao 
			FROM SIGNALS WHERE 1 = 1 
			AND device_fk = ${id}
			AND status = "Pendente" 
		`.trim());
		return signalsList;
	}

	async updateStatusToProcessed(status = "Processado", idLimit: number, id: number): Promise<void> {
		await mysql.raw(`
			UPDATE SIGNALS
			SET status = '${status}'
			WHERE 1 = 1
			AND status = "Pendente"
			AND ID <= ${idLimit}
			AND device_fk = ${id}
		`.trim());
	}

}

export type Signals = {
	id: number,
	signals: string
};