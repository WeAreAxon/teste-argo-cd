<script>
  import { onMount } from "svelte";
  import { Chart } from "chart.js";
  import "chartjs-adapter-luxon";

  export let stoppedTime = [];
  export let workingTime = [];

  let chartSWPD;

  onMount(() => {
    const data = {
      labels: ["Status"],
      datasets: [
        {
          label: "Parado",
          data: [9, 24],
          backgroundColor: "#DB3233",
          barPercentage: 1.0,
          categoryPercentage: 1.0,
        },
        {
          label: "Operando",
          data: [18, 24],
          backgroundColor: "#09AE87",
          barPercentage: 1.0,
          categoryPercentage: 1.0,
        },
      ],
    };

    // config
    const config = {
      type: "bar",
      data,
      options: {
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: {
            display: false,
            // labels: {
            //   color: "black",
            //   font: {
            //     size: 20, // tamanho da fonte em pixels
            //   },
            // },
          },
        },

        scales: {
          x: {
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
            stacked: true,
            grid: {
              display: false,
              color: "#black",
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
    };

    const stackedBar = new Chart(chartSWPD, Object(config));
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
