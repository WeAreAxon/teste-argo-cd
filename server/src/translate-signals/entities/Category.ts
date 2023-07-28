import { mysql } from "../../_config/database";
import { CategoryProtocol } from "../interfaces/CategoryProcol";

export default class Category implements CategoryProtocol {

	public async get(categoryId = 1): Promise<Array<RowDataPacket> | Array<any>> {
		try {

			const [stages]: Array<RowDataPacket> = (await mysql.raw(`
			SELECT  
			signals,
			estagio 
			FROM LOOKUP_CATEGORIA_MAQUINA
			INNER JOIN CATEGORIA_MAQUINA
			ON LOOKUP_CATEGORIA_MAQUINA.ID = CATEGORIA_MAQUINA.unidade_fk
			WHERE LOOKUP_CATEGORIA_MAQUINA.id = "${categoryId}" ORDER BY estagio ASC
			`.trim()));
			
			if (!stages?.length) {
				throw new Error("Catálogo de sinais referentes a essa categoria não está registrado no banco de dados!");
			}
			
			return stages;
		} catch (err) {
			// console.log(err);
			return [];
		}
	}
}

export type RowDataPacket = [
	unidade: string,
	categoria: string,
	switch1: number,
	switch2: number,
	switch3: number,
	switch4: number,
	estagio: number
];