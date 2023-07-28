import { Request, Response } from "express";
import DashboardService from "../services/DashboardService";
import { DashboardDTO } from "../dtos/DashboardDTO";

export default class DashboardController {
	static async getCharts(req: Request, res: Response) {
		try {
			const params: DashboardDTO = req.query as unknown as DashboardDTO;
			return res.status(200).json(await new DashboardService().getTimeline(params));
		}
		catch (err) {
			console.log(err);
			return res.status(400).send(err);
		}
	}
} 