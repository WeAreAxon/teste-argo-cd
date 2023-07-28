import Category from "./entities/Category";
import Device from "./entities/Device";
import Signal from "./entities/Signal";
import Dashboard from "./entities/Dashboard";
import SignalService from "./services/SignalService";
import Status from "./entities/Status";
import StatusService from "./services/StatusService";
import Company from "./entities/Company";
import CompanyService from "./services/CompanyService";

const device = new Device();
const category = new Category();
const signal = new Signal();
const dashboard = new Dashboard();
const status = new Status();

const companyEntity = new Company();
const companyService = new CompanyService(companyEntity);

(function bootstrap() {

	setInterval(async () => {
		try {
			await new SignalService(device, category, signal, dashboard, companyService).compare();
			await new StatusService(device, dashboard, status, companyService).create();
		} catch (err) {
			console.log(err);
		}

	}, 10000);

	console.log("translate-signals service is running!");
})();