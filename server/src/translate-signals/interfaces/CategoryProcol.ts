import { RowDataPacket } from "../entities/Category";

export interface CategoryProtocol {
	get(categoryId: number): Promise<Array<RowDataPacket> | Array<any>>;
}