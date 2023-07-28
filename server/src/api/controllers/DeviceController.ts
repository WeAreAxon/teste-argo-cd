import { Request, Response } from "express";
import DeviceService from "../services/DeviceService";

export default class DeviceController {
	static async getAll(_req: Request, res: Response) {
		try {
			const companyEmail = "martiaco@industria";
			return res.status(200).send(await new DeviceService().getAll(companyEmail));
		} catch (err) {
			console.log(err);
			return res.status(400).send(err);
		}
	}
}