<script>
  import { Chart } from "chart.js/auto";
  import { onMount } from "svelte";

  import "chartjs-plugin-datalabels";

  let producao = 0;
  let producaoLabel = `${producao}%`;
  let chartConfor;

  onMount(() => {
    const stackedBar = new Chart(chartConfor, {
      type: "doughnut",
      data: {
        labels: ["Não Conformidade(s)"],
        datasets: [
          {
            label: "Não Conformidades",
            data: [producao, 50 - producao],
            backgroundColor: ["#E73536", "#B2B2B2"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: false,
          },
        },
        plugins: {
          legend: {
            labels: {
              boxWidth: 0,
              color: "black",
              font: {
                size: 13,
                family: "Gotham",
              },
            },
          },
          datalabels: {
            formatter: (value, ctx) => {
              return "${value}%";
            },
            color: "#000000",
            font: {
              weight: "bold",
              size: 200,
            },
          },
        },
      },
    });
  });
</script>

<canvas bind:this={chartConfor} />
<h3>{producaoLabel}</h3>

<style>
  h3 {
    font-size: 130%;
    font-family: "Montserrat", sans-serif;
    font-weight: bolder;
    text-align: center;
    margin-top: -72px;
  }
  @media screen and (max-width: 700px) {
    h3 {
      font-size: 120%;
      font-family: "Montserrat", sans-serif;
      font-weight: bolder;
      text-align: center;
      margin-top: -70px;
    }
  }
</style>
