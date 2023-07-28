<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	// @ts-ignore
	import Svelecte from "svelecte";

	let optionsSelectSituacao = [
		{ name: "Geral", value: 0 },
		{ name: "Ativo", value: 1 },
		{ name: "Inativo", value: 2 },
	];
	let selectionSituacao: any = null;
	let situacao = "";

	let optionsSelectTurno = [
		{ name: "Geral", value: 0 },
		{ name: "1º turno", value: 1 },
		{ name: "2º turno", value: 2 },
		{ name: "3º turno", value: 3 },
	];
	let selectionTurno: any = null;
	let turno = 0;

	export let optionsSelectMaquina: { name: string; value: string | number }[] = [];
	let selectionMaquina: any = null;
	let maquina = "";

	function closeFilter() {
		dispatch("closeFilter", {
			value: false,
		});

		situacao = "";
		turno = 0;
		maquina = "";
		dtMin = new Date().toISOString().split("T")[0];
		dtMax = new Date().toISOString().split("T")[0];

		dispatchFilter();
	}

	let dtMin = new Date().toISOString().split("T")[0];
	let dtMax = new Date().toISOString().split("T")[0];

	function dispatchFilter() {
		dispatch("filter", {
			turno: turno,
			maquina: maquina,
			situacao,
			dtMin,
			dtMax,
		});
	}

	function cleanFilter() {
		situacao = "";
		turno = 0;
		maquina = "";
		dtMin = new Date().toISOString().split("T")[0];
		dtMax = new Date().toISOString().split("T")[0];

		dispatchFilter();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="filterItem">
	<label for="startDate">Data inicial</label>
	<input id="startDate" class="form-control" type="date" max={dtMax} bind:value={dtMin} />
</div>
<div class="filterItem">
	<label for="startDate">Data final</label>
	<input id="startDate" class="form-control" type="date" min={dtMin} bind:value={dtMax} />
</div>
<div class="filterItem">
	<label for="situacao" class="form-label">Situação</label>
	<Svelecte
		options={optionsSelectSituacao}
		inputId="situacao"
		bind:readSelection={selectionSituacao}
		placeholder="Situação"
		bind:value={situacao}
		required
	/>
</div>
<div class="filterItem">
	<label for="turnos" class="form-label">Turnos</label>
	<Svelecte
		options={optionsSelectTurno}
		inputId="turnos"
		bind:readSelection={selectionTurno}
		placeholder="Turno"
		bind:value={turno}
		required
	/>
</div>
<div class="filterItem">
	<label for="maquinas" class="form-label">Máquina</label>
		<Svelecte
			options={optionsSelectMaquina}
			inputId="maquinas"
			bind:readSelection={selectionMaquina}
			placeholder="Máquina"
			bind:value={maquina}
			required
		/>
</div>
<div class="filterItem">
	<button type="button" on:click={dispatchFilter} class="btn btn-success">Filtrar</button>
</div>
<div class="filterItem">
	<button type="button" class="btn btn-danger" title="Limpar filtro" on:click={cleanFilter}><i class="fas fa-trash" /></button
	>
</div>
<div class="filterItem">
	<button type="button" class="btn btn-secondary" on:click={closeFilter} title="Fechar filtro"
		><i class="fas fa-times" /></button
	>
</div>

<style>
	.filterItem {
		height: fit-content;
		width: fit-content;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		margin: 0px 5px 5px;
	}

	label {
		padding: 0;
		margin: 0;
	}

	input,
	button,
	:global(.svelecte-control) {
		box-shadow: 0px 0px 8px #b4b4b4b9;
	}

	:global(.svelecte-control) {
		min-width: 160px;
		max-width: 180px;
	}
</style>
