import { mysql } from "../../_config/database";

export default class DashboardEntity {
	async getTimeline(datetimeMinimo: string, datetimeMaximo: string, deviceId: number) {
		const [rows] = await mysql.raw(`
			SELECT device_fk, status, tempo_milisegundos, data_criacao
			FROM STATUS
			WHERE 1 = 1 
			AND device_fk = ${deviceId}
			AND data_criacao BETWEEN "${datetimeMinimo}" AND "${datetimeMaximo}"
		`.trim());

		return rows;
	}
}