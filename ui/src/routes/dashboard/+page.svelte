<script lang="ts">
	import DashboardCard from "$lib/components/cards/DashboardCard.svelte";
	import ProgressBar from "$lib/components/cards/ProgressBar.svelte";
    import Timeline from "$lib/components/charts/timeline.svelte";
	import PageNavigation from "$lib/components/navigation/PageNavigation.svelte";
	import { onMount } from "svelte";

	const urlParams = new URLSearchParams(window.location.search);
	const maquina = urlParams.get("nome")!;

	let machine : Record<string, any>;

	onMount(async () => {
		const url = new URL(`${import.meta.env["VITE_BACK_ROUTE"]}/api/v2/dashboard`);
		url.searchParams.append("nome", maquina);
		url.searchParams.append("id", urlParams.get("id")!);
		url.searchParams.append("dataMinima", urlParams.get("dataMinima")!);
		url.searchParams.append("dataMaxima", urlParams.get("dataMaxima")!);

		machine = await fetch(url).then((res) => res.json());
		console.log(machine);
	});
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="content">
	<div class="areaTitle">
		<PageNavigation page={maquina} />
		{maquina}
	</div>
	<div class="areaData">
		<div class="areaGeneralCards">
			<DashboardCard title={`Média de Cortes`} value={120} />
			<DashboardCard title={"Cortes"} value={45454} />
		</div>
		<div class="areaDisponibilty">
			<div class="disponibiltyCard">
				Disponibilidade
				<div class="progressArea">
					Atual
					<ProgressBar value={22} />
				</div>
				<div class="progressArea">
					Total
					<ProgressBar value={88} />
				</div>
			</div>
		</div>
		<div class="areaTimeline">
			<div class="cardTimeline">W / S Diário</div>
			{#key machine}
				{#if machine}
				<Timeline stoppedTime = {machine.stoppingMoments} workingTime={machine.workingMoments}/>
				{:else}
					<h1>Não tem</h1>
				{/if}
			{/key}
		</div>
		<div class="areaEficiencia">
			<div class="cardEficiencia">Eficiência</div>
		</div>
	</div>
</div>

<style>
	.content {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		margin-top: 20px;
		padding-bottom: 20px;
	}

	.areaTitle {
		height: fit-content;
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 35px;
		margin: 0;
		padding: 0;
	}
	.areaData {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		/* background-color: rebeccapurple; */
	}

	.areaDisponibilty {
		width: 100%;
		height: fit-content;
		/* background-color: rebeccapurple; */
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 10px;
	}

	.disponibiltyCard {
		height: 220px;
		width: 100%;
		min-width: 350px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10px;
		font-size: 20px;
		font-weight: bold;
		border-radius: 10px;
		background-color: #fff;
		box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
	}

	.progressArea {
		height: 50%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		font-size: 20px;
		font-weight: lighter;
	}

	.areaGeneralCards {
		width: 100%;
		height: fit-content;
		/* background-color: lightgreen; */
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-around;
		flex-wrap: wrap;
	}

	.areaTimeline {
		height: 300px;
		width: 100%;
		padding: 10px;
		background-color: #fff;
		box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-weight: bolder;
	}

	.areaEficiencia {

		height: 300px;
		width: 100%;
		padding: 10px;
	}

	.cardEficiencia {
		height: 100%;
		width: 100%;
		min-width: 350px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 10px;
		font-size: 20px;
		font-weight: bold;
		border-radius: 10px;
		background-color: #fff;
		box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
	}
</style>
