
export interface CompanyEntityProtocol {
	getBySerialNumber(numero_serie: string): Promise<unknown>;
}