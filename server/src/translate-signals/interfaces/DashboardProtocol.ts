import { dashboardContent } from "../entities/Dashboard";

export interface DashboardProcotol {
	updateStatusToProcessed(idLimit: number): Promise<void>,
	getAllByDeviceID(device_fk: number): Promise<dashboardContent[]>,
	insertAction(id: number, quantity: number, unit: number, shift: number): Promise<void>,
	getLastStatus(device_fk: number) : any,
}