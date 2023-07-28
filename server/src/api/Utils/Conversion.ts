export default class Conversion {
	static getPercent(total: number, partial: number) : number {
		return (partial / total) * 100;
	}
}