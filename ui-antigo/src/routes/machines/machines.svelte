<script>
	import CardConnect from "../../components/cards/card.svelte";
	import Nav from "../../components/nav/nav.svelte";
	import DateFilter from "../../components/filter/dateFilter.svelte";
	import DatesFilter from "../../components/filter/datesFilter.svelte";
	import CardNoInfo from "../../components/cards/cardNoInfo.svelte";
	import Loader from "../../components/loader/loader.svelte";

	let loader = true;

	let filterOn;
	let fromDate = new Date().toLocaleDateString().split("/").reverse().join("-");
	let toDate = new Date().toLocaleDateString().split("/").reverse().join("-");

	let numShift = "Geral";
	let machineName = "Geral";
	let allMachinesProductivity;
	let optionsMaquinas = [];
	let optionsTurnos = [];
	let allSerialNumber = [];
	let filtroCount = 1;
	let status;

	const getStatus = async () => {
		const res = await fetch(`${import.meta.env["VITE_BACK"]}/back/api/v1/status/information`, {
			method: "get",
			credentials: "include",
			headers: {
				"content-type": "application/json",
			},
		});

		const resJson = await res.json();

		return resJson;
	};

	setInterval(async () => {
		status = getStatus();
	}, 30000);

	status = getStatus();

	const clearFiltro = async () => {
		machineName = "Geral";
		numShift = "Geral";
		fromDate = new Date().toISOString().split("T")[0];
		toDate = new Date().toISOString().split("T")[0];
		await submitFiltro();
	};

	const getMachines = async () => {
		loader = true;

		const res = await fetch(`${import.meta.env["VITE_BACK"]}/back/api/v1/machines`, {
			method: "Get",
			credentials: "include",
			headers: {
				"content-type": "application/json",
			},
		});
		const resJson = await res.json();

		resJson.forEach((informationCard) => {
			allSerialNumber.push(informationCard.SERIAL_NUMBER);
		});

		allMachinesProductivity = resJson;
	};

	async function submitFiltro() {
		filtroCount++;

		await getMachines();

		const res = await fetch(
			`${import.meta.env["VITE_BACK"]}
				/back/api/v1/search?nameMachine=${machineName}&shift=${numShift}&fromDate=${fromDate}&toDate=${toDate}&serialNumbers=${allSerialNumber}&route=${"search"}`,
			{
				method: "Get",
				credentials: "include",
				headers: {
					"Content-type": "application/json",
				},
			}
		);

		localStorage.setItem("fromDate", fromDate);
		localStorage.setItem("toDate", toDate);
		localStorage.setItem("turno", numShift);

		const resJson = await res.json();

		resJson.forEach((element) => {
			if (!JSON.stringify(allMachinesProductivity).includes(JSON.stringify(element))) {
				allMachinesProductivity = allMachinesProductivity.filter(
					(device) => element["SERIAL_NUMBER"] !== device["SERIAL_NUMBER"]
				);

				allMachinesProductivity.push(element);
			}
		});

		allMachinesProductivity.sort((a, b) => a.MACHINE.localeCompare(b.MACHINE));

		if (machineName !== "Geral") {
			allMachinesProductivity = allMachinesProductivity.filter((machine) => machine.MACHINE === machineName);
		}

		loader = false;
	}

	const submitInfoFiltro = async () => {
		const res = await fetch(`${import.meta.env["VITE_BACK"]}/back/api/v1/searchMachineShift`, {
			method: "Get",
			credentials: "include",
			headers: {
				"Content-type": "application/json",
			},
			mode: "cors",
		});

		const resJson = await res.json();
		for (let i = 0; i < resJson.shift; i++) {
			optionsTurnos.push(i + 1);
		}

		for (let value of resJson.keyMachines) {
			optionsMaquinas.push(value);
		}

		optionsMaquinas.unshift(0);
		optionsTurnos.unshift(0);
	};

	submitFiltro();
	submitInfoFiltro();
</script>

<Nav navRef="/">
	<body class="h-[90%]">
		<DateFilter bind:filterOn {clearFiltro} />

		{#if filterOn == "filterOn"}
			<div class="filtro flex items-end flex-wrap">
				<div class="filters flex items-center pl-[10px]">
					<DatesFilter bind:diaIni={fromDate} bind:diaFim={toDate} />
				</div>
				<div class="labelAndSelectShift">
					<div class="labelShift">
						<label class="ml-1" for="selectTurno">Turnos</label>
					</div>
					<div class="selectShift">
						<select
							class=" cursor-pointer outline-0 border-[1px] border-solid border-[#D4D4D4] rounded-[5px] w-[10rem] h-[3rem] p-[5px] mr-5 ml-1"
							name="selectTurno"
							bind:value={numShift}
						>
							{#each optionsTurnos as value}
								<option {value} selected>{(value = value == 0 ? "Geral" : value)}</option>
							{/each}
						</select>
					</div>
				</div>

				<div class="labelAndSelectShift">
					<div class="labelShift">
						<label class="ml-1" for="selectTurno">Máquinas</label>
					</div>
					<div class="selectShift">
						<select
							class=" cursor-pointer outline-0 border-[1px] border-solid border-[#D4D4D4] rounded-[5px] w-[10rem] h-[3rem] p-[5px] mr-5 ml-1"
							name="selectTurno"
							bind:value={machineName}
						>
							{#each optionsMaquinas as value}
								<option {value} selected>{(value = value == 0 ? "Geral" : value)}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="buttonFilter">
					<button
						class="btn btn-light mr-3 shacow-sm bg-[#059669] text-white p-[4px] rounded-[6px] ml-[2rem] w-[6rem] h-[3rem] hover:bg-[#166534]"
						on:click={submitFiltro}
					>
						Filtrar
					</button>
				</div>
			</div>
		{/if}

		<div id="containerCardsDash" class="flex mt-[1rem] justify-center gap-[2rem] flex-wrap relative">
			{#key loader}
				{#if allMachinesProductivity != undefined && allMachinesProductivity.length && !loader}
					{#key allMachinesProductivity}
						{#each allMachinesProductivity as information}
							{#key information}
								{#await status then statusOk}
									{#if statusOk.length}
										{#each statusOk as machineStatus}
											{#if information["SERIAL_NUMBER"] === machineStatus["SERIAL_NUMBER"]}
												{#key machineStatus["STATUS"]}
													<CardConnect
														{information}
														text={machineStatus["STATUS"] == true ? "ON" : "OFF"}
														ping={machineStatus["STATUS"] == true ? "online" : "offline"}
													/>
												{/key}
											{/if}
										{/each}
									{/if}
								{/await}
							{/key}
						{/each}
					{/key}
				{:else if loader}
					<CardNoInfo />
					<Loader />
				{/if}
			{/key}
		</div>
	</body>
</Nav>
