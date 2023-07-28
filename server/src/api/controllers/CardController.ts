import { Request, Response } from "express";
import CardService from "../services/CardService";

export default class CardController {
	static async getMachines(req: Request, res: Response) {
		try {
			const { ...params } = req.query;

			return res.status(200).send(await new CardService().getMachines(params));
		} catch (err) {
			console.log(err);
			return res.status(400).send(err);
		}
	}
}
