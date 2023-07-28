import { Request, Response } from "express";
import SignalService
	from "../services/SignalService";
export default class SignalController {
	static async insertOne(req: Request, res: Response): Promise<Response> {
		try {
			if (!Object.prototype.hasOwnProperty.call(req.body, "numSerie")) {
				throw new Error("Número de série não definido");
			}
			return res.status(200).send(new SignalService().insertOne(req.body));
		}
		catch (err) {
			return res.status(400).send(err);
		}
	}
}