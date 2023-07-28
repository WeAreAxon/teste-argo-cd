import express from "express";
import CardController from "./controllers/CardController";
import DeviceController from "./controllers/DeviceController";
import DashboardController from "./controllers/DashboardController";
export const router = express.Router();


router.route("/cards")
	.get(CardController.getMachines);

router.route("/devices")
	.get(DeviceController.getAll);

router.route("/dashboard")
	.get(DashboardController.getCharts);

