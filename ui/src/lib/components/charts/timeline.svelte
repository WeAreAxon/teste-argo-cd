<script>
	// @ts-nocheck
	import { onMount } from "svelte";
	import Chart from "chart.js/auto";
	import "chartjs-adapter-date-fns";
	import "chartjs-adapter-luxon";

	export let stoppedTime = [];
	export let workingTime = [];

	let tomorrowDatetime = new Date();
	tomorrowDatetime.setDate(new Date().getUTCDate() + 1);
	tomorrowDatetime.setUTCHours(0, 0, 0);
	let todayDatetime = new Date();
	todayDatetime.setUTCHours(0, 0, 0);

	let chartSWPD;

	onMount(async () => {

		console.log(workingTime);
		console.log(stoppedTime);

		new Chart(chartSWPD, {
			type: "bar",
			data: {
				labels: ["Status"],
				datasets: [
					{
						label: "Parado",
						data: stoppedTime,
						backgroundColor: "#DB3233",
						barPercentage: 1.0,
						categoryPercentage: 1.0,
					},
					{
						label: "Operando",
						data: workingTime,
						backgroundColor: "#09AE87",
						barPercentage: 1.0,
						categoryPercentage: 1.0,
					},
				],
			},
			options: {
				indexAxis: "y",
				maintainAspectRatio: false,
				plugins: {
					tooltip: {
						enabled: false,
					},
					legend: {
						display: false,
					},
				},
				scales: {
					x: {
						type: "time",
						time: {
							displayFormats: {
								quarter: "HH:mm",
							},
						},
						min: new Date(todayDatetime).toISOString().slice(0, 19),
						max: new Date(tomorrowDatetime).toISOString().slice(0, 19),
						grid: {
							color: "#black",
							lineWidth: 0.5,
						},
						ticks: {
							font: {
								size: 16,
								family: "Montserrat, sans-serif",
								weight: "bold",
							},
							color: "black",
							stepSize: 1,
						},
					},
					y: {
						beginAtZero: true,
						stacked: true,
						grid: {
							display: false,
						},
						ticks: {
							font: {
								size: 20,
								family: "Montserrat, sans-serif",
								weight: "bold",
							},
							color: "black",
							min: 1,
							max: 24,
						},
					},
				},
			},
		});
	});
</script>

<div class="linhas-working-day">
	<canvas bind:this={chartSWPD} />
</div>

<style>
	.linhas-working-day {
		min-width: 95%;
		height: 160px;
	}
	.linhas-working-day canvas {
		min-width: 100%;
	}
</style>
