import { mysql } from "../../_config/database";

export default class Status {
	
	async create(device_fk: number, status: string, tempo_milisegundos: number, shift: number): Promise<void> {
		await mysql.raw(`
			INSERT INTO STATUS(device_fk, status, tempo_milisegundos, shift)
			VALUES(
				${device_fk},
				'${status}',
				${tempo_milisegundos},
				${shift}
			)
		`);
	}
}