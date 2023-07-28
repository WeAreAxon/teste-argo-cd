<script>
  import { Chart } from "chart.js/auto";
  import { onMount } from "svelte";

  let chartConnect;
  export let percent = 70;

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
          const fontSizeLabel = 14;
          ctx.font = `${fontSizeLabel}px gotham`;
          ctx.fillStyle = "rgba(0, 0, 0, 1)";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(
            data.labels[index],
            left,
            y.getPixelForValue(index) - fontSizeLabel - 1
          );

          //texto de Valor
          const fontSizeDatapoint = 14;
          ctx.font = `${fontSizeDatapoint}px gotham`;
          ctx.fillStyle = "rgba(0, 0, 0, 1)";
          ctx.textAlign = "right";
          ctx.textBaseline = "middle";
          ctx.fillText(
            datapoint + "%",
            right,
            y.getPixelForValue(index) - fontSizeDatapoint - 1
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
        labels: ["Acabamento"],
        datasets: [
          {
            data: [percent, 100],
            backgroundColor: ["#E73536"],
            borderWidth: 0,
            borderColor: ["#D9D9D9"],
            barPercentage: 0.1,
            categoryPercentage: 0.2,
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

<div id="size">
  <canvas bind:this={chartConnect} />
</div>

<style>
  #size {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: -20%;
  }
  @media screen and (min-width: 1920px) {
    #size {
      margin-bottom: -15.5%;
    }

    @media screen and (min-width: 2630px) {
      #size {
        height: 300px;
        margin-top: -100px;
      }
    }
  }
</style>
