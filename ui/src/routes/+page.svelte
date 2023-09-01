<script lang="ts">
	import { onMount } from "svelte";
	import SearchBtn from "$lib/components/buttons/SearchBtn.svelte";
	import MachineCard from "$lib/components/cards/MachineCard.svelte";
	import CardsFilter from "$lib/components/filters/CardsFilter.svelte";
	import SearchBtnReadonly from "$lib/components/buttons/SearchBtnReadonly.svelte";

	let filterArea = false;
	function handlefilterArea(status: boolean) {
		filterArea = status;
	}

	let machineContentFullVersion: { numero_serie: string; apelido: string; email_proprietaria: string; status: boolean }[] =
		[];
	let contentShow: { numero_serie: string; apelido: string; email_proprietaria: string; status: boolean }[] = [];
	let listaDeMaquinaParaSelecionar: { name: string; value: string | number }[] = [{ name: "Geral", value: "" }];

	onMount(async () => {
		const url = `/api/v2/devices`;
		const res = await fetch(url);
		machineContentFullVersion = await res.json();

		contentShow = machineContentFullVersion;

		for await (const device of machineContentFullVersion) {
			listaDeMaquinaParaSelecionar.push({ name: device.apelido, value: device.numero_serie });
		}
	});

	let turno = 0;
	let maquina = "";
	let situacao = 0;
	let dtMin = new Date().toISOString().split("T")[0];
	let dtMax = new Date().toISOString().split("T")[0];
	let contagemFiltroExecuções = 0;

	function handleSearch(event: any) {
		let search = event.detail.text;

		if (maquina === "" || maquina === "Geral") {
			contentShow = machineContentFullVersion.filter((el) => {
				if (
					el.numero_serie.toLowerCase().includes(search.toLowerCase()) ||
					el.apelido.toLowerCase().includes(search.toLowerCase())
				) {
					return el;
				}
			});
		}
	}

	function handlefilter(event: Record<string, any>) {
		turno = event.detail.turno;
		maquina = event.detail.maquina;
		situacao = event.detail.situacao;
		dtMin = event.detail.dtMin;
		dtMax = event.detail.dtMax;

		if (maquina && maquina !== "Geral") {
			contentShow = machineContentFullVersion.filter((el) => el.numero_serie === maquina);
		} else {
			contentShow = machineContentFullVersion;
		}

		if (situacao) {
			const statusBool = situacao === 1 ? true : false;
			contentShow = contentShow.filter((el) => el.status === statusBool);
		}

		contagemFiltroExecuções += 1;
	}
</script>

<svelte:head>
	<title>13Connect</title>
</svelte:head>

<div class="content">
	<div class="areaSearch">
		{#key maquina}
			{#if maquina !== "" && maquina !== "Geral"}
				<SearchBtnReadonly value={maquina}/>
			{:else}
				<SearchBtn value={""} on:message={handleSearch} />
			{/if}
		{/key}
		<div class="areaFilters">
			{#key filterArea}
				{#if filterArea}
					<CardsFilter
						optionsSelectMaquina={listaDeMaquinaParaSelecionar}
						on:closeFilter={() => handlefilterArea(false)}
						on:filter={handlefilter}
					/>
				{:else}
					<button type="button" class="btn btn-primary" on:click={() => handlefilterArea(true)}>Filtros</button>
				{/if}
			{/key}
		</div>
	</div>
	{#key contagemFiltroExecuções}
		<div class="contentCards">
			{#key contentShow}
				{#each contentShow as device}
					<MachineCard
						numero_serie={device.numero_serie}
						apelido_maquina={device.apelido}
						turnoSelecionado={turno}
						dataMaxima={dtMax}
						dataMinima={dtMin}
					/>
				{/each}
			{/key}
		</div>
	{/key}
</div>

<style>
	.contentCards {
		height: fit-content;
		max-height: 100%;
		overflow-y: auto;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-around;
		flex-wrap: wrap;
		padding-bottom: 1rem;
	}

	.areaSearch {
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-bottom: 15px;
	}

	.areaFilters {
		height: fit-content;
		width: fit-content;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: center;
		flex-wrap: wrap;
	}
</style>
