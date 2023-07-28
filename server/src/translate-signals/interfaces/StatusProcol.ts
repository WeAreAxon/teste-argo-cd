export interface StatusProcol {
	create(device_fk: number, status: string, tempo_milisegundos: number, shift: number): Promise<void>;
}