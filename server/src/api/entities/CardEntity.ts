import { mysql } from "../../_config/database";
import { CardDTO } from "../dtos/CardDTO";
import { GetCardDTO } from "../dtos/GetCardDTO";
export default class CardEntity {

	async getCard(props: GetCardDTO): Promise<CardDTO[]> {

		const [rows] = await mysql.raw(`
			CALL getMachines(
				'${props.fromDate}',
				'${props.toDate}',
				'${props.shift}',
				'${props.passMidnight}',
				'${props.machine}',
				'${props.fromDatetimeShift}',
				'${props.toDatetimeShift}'
				)
		`.trim());
		if (!rows.length) {
			return [];
		}
		return rows[0];
	}

	async getStatus(deviceId: number) {
		const [rowsStatus] = await mysql.raw(`
		SELECT DEVICE.numero_serie, STATUS.status, STATUS.data_criacao FROM STATUS
		INNER JOIN DEVICE
		ON STATUS.device_fk = DEVICE.ID
		WHERE DEVICE.ID= '${deviceId}' ORDER BY STATUS.data_criacao DESC LIMIT 1
	`.trim());

		return rowsStatus[0];
	}

	async getStatusMilliseconds(props: GetCardDTO) {
		let query = `SELECT numero_serie, SUM(total_milisegundos) as total_milisegundos, status
		FROM( 
			SELECT DEVICE.numero_serie, SUM(tempo_milisegundos) as total_milisegundos, STATUS.status, STATUS.data_criacao, shift FROM STATUS
			INNER JOIN DEVICE
			ON STATUS.device_fk = DEVICE.ID
			GROUP BY numero_serie, status, data_criacao, shift
		) as tb1 WHERE 1 = 1`;
		
		if (props.fromDate !== "") {
			query += ` AND DATE(tb1.data_criacao) >= '${props.fromDate}'`;
		}

		if (props.toDate !== "") {
			query += ` AND DATE(tb1.data_criacao) <= '${props.toDate}'`;
		}

		if (props.shift != 0) {
			query += ` AND tb1.shift = ${props.shift}`;
		}

		if (props.machine !== "") {
			query += ` AND tb1.numero_serie = '${props.machine}'`;
		}

		if (props.passMidnight === 1) {
			query = `
				SELECT * FROM ( ${query} ) WHERE tb1.data_criacao >= '${props.fromDatetimeShift}' AND tb1.data_criacao <= '${props.toDatetimeShift}';
			`;
		}

		query += " GROUP BY numero_serie, status ORDER BY status ASC";
	
		return await mysql.raw(query);
	}

}