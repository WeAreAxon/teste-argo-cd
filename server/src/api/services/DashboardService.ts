import { DashboardDTO } from "../dtos/DashboardDTO";
import DateLimit from "../Utils/DateLimit";
import DashboardEntity from "../entities/DashboardEntity";
import CardService from "./CardService";
import moment from "moment";

export default class DashboardService {
	async getTimeline(params: DashboardDTO) {
		const { dataMinima, dataMaxima, id } = params;
		const dateDifferece = await new DateLimit().getDifference(dataMaxima, dataMinima);

		if (!dataMinima || !dataMaxima || !id) {
			throw new Error("Informações de filtragem inválidas");
		}

		if (dateDifferece) {
			throw new Error("A timeline só aparece se as datas filtradas tiverem o mesmo dia");
		}

		const todayMidnight = new Date(dataMinima).toISOString().slice(0, 19).replace("T", " ");

		const date = new Date();
		date.setUTCHours(23, 59, 59, 0);
		const lastMinuteToday = date.toISOString().slice(0, 19).replace("T", " ");

		const rows = await new DashboardEntity().getTimeline(todayMidnight, lastMinuteToday, id);

		if (!rows.length) {
			throw new Error("Registros não encontrados no banco de dados");
		}
		const stoppedMomentList = rows.filter((row: Record<string, any>) => row.status === "Desligado");
		const workingMoments: any[] = [];
		const stoppingMoments = [];

		for await (const [index, row] of stoppedMomentList.entries()) {
			let dataMinima = "";
			let dataMaxima = "";

			dataMinima = new Date(moment(row.data_criacao, "YYYY-MM-DD HH:mm:ss").valueOf() - row.tempo_milisegundos).toISOString();
			dataMaxima = new Date(moment(row.data_criacao, "YYYY-MM-DD HH:mm:ss").valueOf()).toISOString();

			if (!index) {
				stoppingMoments.push({
					x: [dataMinima.split("T")[0] + " 00:00:00", dataMinima],
					y: "Status"
				});
			}

			stoppingMoments.push({
				x: [dataMinima, dataMaxima],
				y: "Status"
			});
		}

		for await (const [index, date] of stoppingMoments.entries()) {
			let dataMinima;
			let dataMaxima;

			if (index) {
				dataMinima = stoppingMoments[index - 1]?.x[1];
				dataMaxima = date?.x[0], "YYYY-MM-DD HH:mm:ss";

				workingMoments.push({
					x: [dataMinima, dataMaxima],
					y: "Status"
				});
			}
		}

		const cardService = await new CardService();
		const machineLastStatus = await cardService.getCurrentStatus(params.id);
		const isWorking = machineLastStatus.boolean;

		if (isWorking) {
			workingMoments.push({
				x: [workingMoments[workingMoments.length - 1].x[1], new Date().toISOString()],
				y: "Status"
			});
		}
		else {
			stoppingMoments.push({
				x: [stoppingMoments[stoppingMoments.length - 1]?.x[1], new Date().toISOString()],
				y: "Status"
			});
		}

		return { workingMoments, stoppingMoments };
	}
}