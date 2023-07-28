export interface DeviceProtocol {
	findMany(): Promise<{id: number, numero_serie: string, categoria_fk: number}[]> 
}