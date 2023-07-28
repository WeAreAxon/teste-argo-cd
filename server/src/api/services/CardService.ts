/* eslint-disable @typescript-eslint/no-non-null-assertion */

import Conversion from "../Utils/Conversion";
import { GetCardDTO } from "../dtos/GetCardDTO";
import CardEntity from "../entities/CardEntity";
import CompanyEntity from "../entities/CompanyEntity";
import CompanyService from "./CompanyService";
export default class CardService {

	async getMachines(params: Record<string, any>) /*: Promise<CardDTO[]> */ {
		const paramsChecked = await this.checkParams(params);
		const companyInstance = new CompanyService();
		const company = await new CompanyEntity().getCompany(params.machine);

		if (!company) {
			throw new Error(`O email: ${params.machine} não se refere a nenhuma empresa!`);
		}

		const machine = (await new CardEntity().getCard(paramsChecked));
		const statusMilliseconds = await this.getStatusMilliseconds(params as GetCardDTO);
	
		if (!machine.length) {
			throw new Error(`A máquina ${params.machine} não está funcionando`);
		}
		
		const status = await this.getCurrentStatus(paramsChecked.device_fk);

		const durationShiftMilliseconds = await companyInstance
			.getShiftDurationMilliseconds(paramsChecked.machine, paramsChecked.shift, paramsChecked.fromDate, paramsChecked.toDate);

		const percentProductivity = Conversion.getPercent(durationShiftMilliseconds, statusMilliseconds.tempoFuncionando);
		
		machine[0]!.tempo_parado_milisegundos = durationShiftMilliseconds - statusMilliseconds.tempoFuncionando;

		machine[0]!.tempo_funcionando_milisegundos = statusMilliseconds.tempoFuncionando;
		machine[0]!.status = status.boolean;
		machine[0]!.percent = Math.ceil(percentProductivity);

		return machine[0];
	}

	async getStatusMilliseconds(params: GetCardDTO) {
		const [rows] = await new CardEntity().getStatusMilliseconds(params);
		let tempoFuncionando = 0;
		let tempoParado = 0;

		if (!rows.length) {
			return {
				tempoFuncionando,
				tempoParado,
			};
		}

		rows.forEach((element: Record<string, any>) => {
			if (element.status === "Ligado") {
				tempoFuncionando = element.total_milisegundos;
			}
			else {
				tempoParado = element.total_milisegundos;
			}
		});

		return {
			tempoFuncionando,
			tempoParado
		};
	}

	private async checkParams(params: Record<string, any>) {
		let { fromDate, toDate, situation, shift, machine } = params;
		let isSameDay = false;
		params.passMidnight = 0;

		if (!Object.prototype.hasOwnProperty.call(params, "fromDate") && !fromDate) {
			fromDate = "";
		}

		if (!Object.prototype.hasOwnProperty.call(params, "toDate") && !toDate) {
			toDate = "";
		}

		if (!Object.prototype.hasOwnProperty.call(params, "situation") && !situation) {
			situation = "";
		}

		if (!Object.prototype.hasOwnProperty.call(params, "shift") && !shift) {
			shift = 0;
		}

		if (!Object.prototype.hasOwnProperty.call(params, "machine") && !machine) {
			machine = "";
		}

		if (fromDate === toDate) {
			isSameDay = true;
		}
		
		const companyInstance = new CompanyService();
		params.isSameDay = isSameDay;
		
		if (Number(params.shift) !== 0 && params.shift) {
			const datetimeStartEnd = await companyInstance
				.getDatetimeShift(params.machine, params.fromDate, params.toDate, params.shift);

			if (datetimeStartEnd) {
				params.fromDatetimeShift = datetimeStartEnd.fromTime as string;
				params.toDatetimeShift = datetimeStartEnd.toTime as string;
				params.passMidnight = datetimeStartEnd.passMidnight ? 1 : 0;
			}
		}
		return params as GetCardDTO;
	}

	async getCurrentStatus(deviceId: number) {
		try {
			const lastStatus = await new CardEntity().getStatus(deviceId);
			if (!lastStatus) {
				throw new Error(`Máquina ${deviceId} não possui registros`);
			}
			const nowMilliseconds = new Date().getTime();
			const statusCreatedAtMilliseconds = new Date(lastStatus.data_criacao).getTime();
			const differenceSinceCreated = nowMilliseconds - statusCreatedAtMilliseconds;
			return { boolean: differenceSinceCreated > 300000 ? false : true, differenceSinceCreated };
		} catch (err) {
			console.log(err);
			return { boolean: false, differenceSinceCreated: 0 };
		}

	}



}
