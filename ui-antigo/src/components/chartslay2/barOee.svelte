<script>
  import { Chart } from "chart.js/auto";
  import { onMount } from "svelte";

  let chartConnect;
  //   export let percent;

  onMount(() => {
    const progressBar = {
      id: "progressBar",
      beforeDatasetsDraw(chart) {
        const {
          ctx,
          data,
          chartArea: { top, bottom, left, right, width, height },
          scales: { x, y },
        } = chart;

        ctx.save();
        const barHeight =
          (height / y.ticks.length) *
          data.datasets[0].barPercentage *
          data.datasets[0].categoryPercentage;

        data.datasets[0].data.forEach((datapoint, index) => {
          // texto do nome da barra
          const fontSizeLabel = 18;
          ctx.font = `bold ${fontSizeLabel}px Montserrat, sans-serif`;
          ctx.fillStyle = "rgba(0, 0, 0, 1)";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(
            data.labels[index],
            left,
            y.getPixelForValue(index) - fontSizeLabel - 20
          );

          //texto de Valor
          const fontSizeDatapoint = 18;
          ctx.font = `bold ${fontSizeDatapoint}px Montserrat, sans-serif`;
          ctx.fillStyle = "rgba(0, 0, 0, 1)";
          ctx.textAlign = "right";
          ctx.textBaseline = "middle";
          ctx.fillText(
            datapoint + "%",
            right,
            y.getPixelForValue(index) - fontSizeDatapoint - 18
          );

          //background color progressbar
          ctx.beginPath();
          ctx.fillStyle = data.datasets[0].borderColor[index];
          ctx.fillRect(
            left,
            y.getPixelForValue(index) - barHeight / 2,
            width,
            barHeight
          );
        });
      },
    };

    const stackedBar = new Chart(chartConnect, {
      type: "bar",
      data: {
        labels: ["OEE Produção"],
        datasets: [
          {
            // data: [percent, 100],
            data: [85, 100],
            backgroundColor: ["#09AE87"],
            borderWidth: 0,
            borderColor: ["#D9D9D9"],
            barPercentage: 0.2,
            categoryPercentage: 0.4,
          },
        ],
      },
      options: {
        indexAxis: "y",
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
            border: {
              display: false,
            },
            ticks: {
              font: {
                size: 20, // tamanho da fonte em pixels
              },
            },
          },
          y: {
            suggestedMax: 100,
            display: false,
            beginAtZero: true,
            border: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
      plugins: [progressBar],
    });
  });
</script>

<div class="linhas-working-day">
  <canvas bind:this={chartConnect} />
</div>

<style>
  .linhas-working-day {
    min-width: 95%;
    height: 800px;
  }
  .linhas-working-day canvas {
    min-width: 100%;
  }
</style>
