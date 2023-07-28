export interface CompanyProtocol {
	getCurrentShift(numero_serie: string): Promise<number>;
	currentDurationSinceStart(deviceSerialNum: string) : Promise<number>;
}