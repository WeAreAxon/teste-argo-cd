import { mysql } from "../../_config/database";

export default class Dashboard {
	async getAllByDeviceID(device_fk: number): Promise<dashboardContent[]> {
		const [rows] = await mysql.raw(`
			SELECT * FROM DASHBOARD WHERE device_fk = ${device_fk} AND status = "Pendente";
		`.trim());

		return rows;
	}

	async updateStatusToProcessed(idLimit: number) {
		await mysql.raw(`
			UPDATE DASHBOARD
			SET status = "Processado"
			WHERE ID <= ${idLimit}
		`);
	}

	async insertAction(id: number, quantity: number, unit: number, shift: number): Promise<void> {
		await mysql.raw(`
			INSERT INTO DASHBOARD(device_fk, quantidade, unidade_fk, shift)
			VALUES(
			'${id}',
			${quantity},
			${unit},
			${shift}
			)
		`.trim());
	}

	async getLastStatus(device_fk: number) {
		const [rows] = await mysql.raw(`
			SELECT * FROM STATUS WHERE device_fk = ${device_fk} ORDER BY ID DESC LIMIT 1;
		`.trim());
		return rows;
	}
}

export type dashboardContent = {
	ID: number,
	device_fk: number,
	unidade_fk: number,
	quantidade: number,
	data_criacao: string;
};