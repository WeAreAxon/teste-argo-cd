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
          data: [3, 12],
          backgroundColor: "#BFBFBF",
          barPercentage: 1.0,
          categoryPercentage: 1.0,
        },
        {
          label: "Operando",
          data: [6, 12],
          backgroundColor: "#D9D9D9",
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
        indexAxis: "x",
        plugins: {
          legend: {
            display: false,
          },
        },

        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
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
              display: true,
              lineWidth: 0.2,
              color: "#black",
            },
            ticks: {
              font: {
                size: 12,
                family: "Gotham, sans-serif",
              },
              color: "black",
              max: 24,
              stepSize: 1,
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
    min-width: 100%;
    height: 420px;
  }
  .linhas-working-day canvas {
    min-width: 100%;
  }

  @media screen and (min-width: 2630px) {
    .linhas-working-day {
      height: 550px;
    }
  }
</style>
