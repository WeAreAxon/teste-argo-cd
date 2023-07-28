<script>
  import { onMount } from "svelte";
  import { Chart } from "chart.js";
  import ChartDataLabels from "chartjs-plugin-datalabels";
  import { claim_text } from "svelte/internal";

  let chartOEE;

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
          ctx.font = `${fontSizeLabel}px sans-serif`;
          ctx.fillStyle = "rgba(0, 0, 0, 1)";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(
            data.labels[index],
            left,
            y.getPixelForValue(index) - fontSizeLabel - 5
          );

          //texto de Valor
          const fontSizeDatapoint = 18;
          ctx.font = `${fontSizeDatapoint}px sans-serif`;
          ctx.fillStyle = "rgba(0, 0, 0, 1)";
          ctx.textAlign = "right";
          ctx.textBaseline = "middle";
          ctx.fillText(
            datapoint + "%",
            right,
            y.getPixelForValue(index) - fontSizeDatapoint - 5
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

    const stackedBar = new Chart(chartOEE, {
      type: "bar",
      data: {
        labels: [
          "Refugo",
          "Retrabalho",
          "Dobra Invertida",
          "Respingo de Solda",
          "Acabamento",
        ],
        datasets: [
          {
            label: "Não Conformidades",
            data: [25, 50, 100, 33, 62],
            backgroundColor: ["#09AE87", "#DB3233"],
            borderColor: "#D9D9D9",
            borderWidth: 1,
            barPercentage: 1,
            categoryPercentage: 0.8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                position: "top",
              },
            },
          ],
          x: {
            grid: {
              display: false,
            },
            ticks: {
              display: true,
              color: "black",
              font: {
                size: 8,
                family: "Gotham, san-serif",
              },
            },
            border: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
              font: {
                size: 8,
                family: "Gotham",
              },
              color: "black",
            },
            border: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              boxWidth: 0,
              color: "black",
              font: {
                size: 12,
                family: "Gotham",
              },
            },
          },
          datalabels: {
            color: "black",
            anchor: "end",
            align: "start",
            font: {
              size: 12,
              family: "Gotham",
              weight: "500",
            },
            formatter: function (value, context) {
              return value + "%";
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
    height: 250px;
  }
  #linhas-oee canvas {
    min-width: 100%;
  }
</style>
