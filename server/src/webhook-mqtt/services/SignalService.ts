import { SignalDTO } from "../dtos/SignalDTO";
import SignalEntity from "../entities/SignalEntity";
import DeviceEntity from "../entities/DeviceEntity";

export default class SignalService {
	async insertOne(body: SignalDTO): Promise<SignalEntity | void> {
		const switches = await this.checkSwitch(body);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const numSerie = body.numSerie.split("_")[1]!;
		const device: any[] = await new DeviceEntity().findOne(numSerie);

		if (device.length && Object.prototype.hasOwnProperty.call(device[0], "ID")) {
			await new SignalEntity().create(device[0].ID, switches);
		}
	}

	private async checkSwitch(body: SignalDTO) {
		const switches: number[] = [0, 0, 0, 0];
		let currentBit = 0;
		let bit = 0;

		if (Object.prototype.hasOwnProperty.call(body, "Switch1")) {
			currentBit = 0;
			bit = body.Switch1?.Action === "ON" ? 1 : 0;
		}

		if (Object.prototype.hasOwnProperty.call(body, "Switch2")) {
			currentBit = 1;
			bit = body.Switch2?.Action === "ON" ? 1 : 0;
		}

		if (Object.prototype.hasOwnProperty.call(body, "Switch3")) {
			currentBit = 2;
			bit = body.Switch3?.Action === "ON" ? 1 : 0;
		}

		if (Object.prototype.hasOwnProperty.call(body, "Switch4")) {
			currentBit = 3;
			bit = body.Switch4?.Action === "ON" ? 1 : 0;
		}

		switches[currentBit] = bit;
		return switches.join("");
	}
}