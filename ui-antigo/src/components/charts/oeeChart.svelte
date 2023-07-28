<script>
  import { onMount } from "svelte";
  import { Chart } from "chart.js";
  import ChartDataLabels from "chartjs-plugin-datalabels";

  let chartOEE;

  onMount(() => {
    const stackedBar = new Chart(chartOEE, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Maio",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
          "Média",
        ],
        datasets: [
          {
            label: "OEE Mensal",
            data: [90, 95, 88, 86, 86, 92, 90, 86, 90, 95, 100, 80, 90],
            backgroundColor: [
              "#C6C6C6",
              "#C6C6C6",
              "#C6C6C6",
              "#C6C6C6",
              "#C6C6C6",
              "#C6C6C6",
              "#C6C6C6",
              "#C6C6C6",
              "#C6C6C6",
              "#C6C6C6",
              "#C6C6C6",
              "#C6C6C6",
              "#C6C6C6",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: "#C6C6C6",
              display: false,
            },
            ticks: {
              font: {
                size: 20, // tamanho da fonte em pixels
              },
              color: "black",
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "#C6C6C6",
            },
            ticks: {
              font: {
                size: 20, // tamanho da fonte em pixels
              },
              callback: (value, index, values) => {
                return value + "%";
              },
              color: "black",
            },
            border: {
              display: true,
              color: "rgba (0, 0, 0)",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            color: "white",
            anchor: "end",
            align: "start",
            font: {
              size: 18,
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  });
</script>

<div id="linhas-oee">
  <canvas bind:this={chartOEE} />
</div>

<style>
  #linhas-oee {
    min-width: 90%;
    height: 450px;
  }
  #linhas-oee canvas {
    min-width: 100%;
  }
</style>
