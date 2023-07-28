<script>
  import { Chart } from "chart.js/auto";
  import { onMount } from "svelte";

  import "chartjs-plugin-datalabels";

  export let producao;
  let producaoLabel = `${producao}%`;
  let pieAtual;

  onMount(() => {
    const stackedBar = new Chart(pieAtual, {
      type: "pie",
      data: {
        labels: ["Disponibilidade Atual"],
        datasets: [
          {
            label: "Não Conformidades",
            data: [producao, 100 - producao],
            backgroundColor: ["#E73536", "#D9D9D9"],
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
                size: 13, // tamanho da fonte em pixels
                family: "Gotham",
                weight: "bolder",
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

<canvas bind:this={pieAtual} />
<h3>{producaoLabel}</h3>

<style>
  h3 {
    font-size: 200%;
    font-family: "Gotham", sans-serif;
    font-weight: bolder;
    text-align: center;
    margin-top: -105px;
    pointer-events: none;
  }

  @media screen and (max-width: 700px) {
    h3 {
      font-size: 250%;
      margin-top: -110px;
    }
  }

  @media screen and (min-width: 1920px) {
    h3 {
      margin-top: -85px;
    }
  }

  @media screen and (min-width: 2630px) {
    h3 {
      margin-top: -75px;
    }
  }
</style>
