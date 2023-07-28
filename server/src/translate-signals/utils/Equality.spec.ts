import { describe, expect, it } from "vitest";
import Equality from "./Equality";

const createSut = () => {
	return Equality;
};

describe("Equality", () => {

	it("Should return the quantity of actions acordding by machines catalog", async () => {
		const fakeSignalsToBeCompared = [
			{ id: 1, signals: "1000" },
			{ id: 2, signals: "0000" },
			{ id: 3, signals: "1000" },
			{ id: 4, signals: "0000" },
			{ id: 5, signals: "1000" },
			{ id: 6, signals: "0000" },
		];
		const fakeCatalog = [
			{ signals: "1000", estagio: 1 },
			{ signals: "0000", estagio: 2 }
		];

		const sut = createSut();
		const obj = await sut.check(fakeSignalsToBeCompared, fakeCatalog);

		expect(obj).toHaveProperty("actionCount", 3);
		expect(obj).toHaveProperty("id", 6);
	});

});