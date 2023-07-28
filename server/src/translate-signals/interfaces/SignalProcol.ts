import { Signals } from "../entities/Signal";

export interface SignalProtocol {
	findById(id: number): Promise<Signals[]>;
	updateStatusToProcessed(status: "Processado", idLimit: number, id: number): Promise<void>;
}

