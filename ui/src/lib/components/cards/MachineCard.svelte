<script lang="ts">
	import { onMount } from "svelte";
	import StatusBadge from "../badges/StatusBadge.svelte";
	import Loader from "../navigation/Loader.svelte";

	const turnoOptions = ["Geral", "1º Turno", "2º Turno", "3º Turno"];

	/**
	 * @param {number} value
	 */
	function convertPctToDegree(value: number) {
		return value * 3.6;
	}

	export let numero_serie = "";
	export let apelido_maquina = "";
	export let turnoSelecionado = 0;
	export let dataMinima = "";
	export let dataMaxima = "";

	let machineContentFullVersion: { [key: string]: any };

	let maquina = "";
	let valorPct = 0; // valor da porcentagem atingida (em %)
	let metaPct = 0; // valor da meta (em %)
	let corMaquinaDesempenho = "#D40F0F";
	let maquinaLigada = true; // Maquina ligada true ou false
	let turno = turnoOptions[0];
	let tipoOperacao = "Golpes";
	let qtdOperacao = "Sem funcionamento";
	let tempoTrabalhado = "00:00:00";
	let tempoParado = "00:00:00";

	let loader = true;
	let atualizaCard = 0;

	onMount(async () => {
		const url = `/api/v2/cards?machine=${numero_serie}&shift=${turnoSelecionado}&fromDate=${dataMinima}&toDate=${dataMaxima}`;
		const res = await fetch(url);
		machineContentFullVersion = await res.json();
		maquina = machineContentFullVersion.apelido || apelido_maquina; // Apelido da máquina
		valorPct = machineContentFullVersion.percent || 0; // valor da porcentagem atingida (em %)
		metaPct = 85; // valor da meta (em %)
		maquinaLigada = machineContentFullVersion.status || false; // Maquina ligada true ou false
		tipoOperacao = machineContentFullVersion.unidade || "Golpes";
		qtdOperacao = machineContentFullVersion.total || "Sem funcionamento";
		tempoTrabalhado = await millisecondsToDateTime(machineContentFullVersion.tempo_funcionando_milisegundos || 0);
		tempoParado = await millisecondsToDateTime(machineContentFullVersion.tempo_parado_milisegundos || 0);

		turno = turnoOptions[turnoSelecionado || 0];
		corMaquinaDesempenho = valorPct >= metaPct ? "#038C6B" : "#D40F0F";

		loader = false;
		atualizaCard += 1;
	});

	/**
	 * @param {number} milliseconds
	 */
	async function millisecondsToDateTime(milliseconds: number) {
		if (!milliseconds) {
			return "00:00:00";
		}

		let segundos: string | number = Math.floor(milliseconds / 1000);
		let minutos: string | number = Math.floor((segundos % 3600) / 60);
		let horas: string | number = Math.floor(segundos / 3600);
		segundos = segundos % 60;

		horas = horas < 10 ? "0" + horas : horas;
		minutos = minutos < 10 ? "0" + minutos : minutos;
		segundos = segundos < 10 ? "0" + segundos : segundos;

		return horas + ":" + minutos + ":" + segundos;
	}
</script>

<div class="card">
	{#key atualizaCard}
		<a
			href="/dashboard?
		nome={maquina}&
		id={machineContentFullVersion && Object.keys(machineContentFullVersion).length ? machineContentFullVersion.ID : 0}&
		dataMinima={dataMinima}&
		dataMaxima={dataMaxima}"
		>
			<i class="fa-solid fa-chart-simple dashboardIcon" />
		</a>
		<div class="areaDoughnut">
			<div
				class="doughnutExterno"
				style="background: 
		conic-gradient(
     	   {corMaquinaDesempenho} 0deg {convertPctToDegree(valorPct)}deg,
     	   #B0B0B0 0deg {convertPctToDegree(metaPct)}deg,
     	   #ffffff 0deg 360deg
    	);;"
			>
				<div class="doughnutInterno">
					{valorPct}%
				</div>
			</div>
		</div>
		<div class="areaCardInfo">
			<div class="nomeMaquina">{maquina.toUpperCase()}</div>
			<div class="areaDados">
				<div class="infoMaquina"><strong>Turno:</strong> {turno}</div>
				<div class="infoMaquina"><strong>{tipoOperacao}:</strong> {qtdOperacao}</div>
				<div class="infoMaquina"><strong>Tempo trabalhado:</strong> {tempoTrabalhado}</div>
				<div class="infoMaquina"><strong>Tempo parado:</strong> {tempoParado}</div>
			</div>
			<div class="statusMaquina">
				<StatusBadge {maquinaLigada} />
			</div>
		</div>
		{#key loader}
			{#if loader}
				<Loader maquina={numero_serie} />
			{/if}
		{/key}
	{/key}
</div>

<style>
	.card {
		height: 535px;
		width: 325px;
		margin: 10px 5px;
		border-radius: 20px;
		background-color: #fff;
		box-shadow: 0px 4px 10px #9b9b9b;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
		position: relative;
	}

	.dashboardIcon {
		position: absolute;
		font-size: 30px;
		top: 10px;
		right: 10px;
		color: #b0b0b0;
	}

	.areaDoughnut {
		height: 50%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.doughnutExterno {
		border-radius: 100%;
		width: 230px;
		height: 230px;
		border: 15px solid #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-shadow: 0px 4px 15px #9b9b9b, inset 0px 0px 12px #9b9b9b;
	}

	.doughnutInterno {
		height: 150px;
		width: 150px;
		border-radius: 50%;
		background-color: #fff;
		box-shadow: 0px 4px 25px #9b9b9b;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 50px;
	}

	.areaCardInfo {
		height: 50%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}

	.nomeMaquina {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 28px;
	}

	.areaDados {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		padding: 10px 5px;
	}

	.infoMaquina {
		height: fit-content;
		flex-wrap: wrap;
		font-size: 18px;
	}

	.statusMaquina {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
