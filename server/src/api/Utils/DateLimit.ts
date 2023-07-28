import moment from "moment";

export default class DateLimit {
	async getDifference(dataMaxima: string, dataMinima: string) {
		return moment(dataMaxima, "YYYY-MM-DD").diff(moment(dataMinima, "YYYY-MM-DD"), "days");
	}
}