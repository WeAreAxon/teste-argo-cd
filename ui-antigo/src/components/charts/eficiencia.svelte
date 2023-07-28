<script>
  import ChartButton from "../buttons/chartButton.svelte";

  let chartConnect;
  let machineArgs = "";
  let monthArgs = "";
  let attChart = 0;


  let unit;

  let options = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  async function generateChart(e) {
    const { Chart } = await import("chart.js");


    unit = localStorage.getItem("unit") || "hour"

    const nowMonth = new Date().getMonth();
    attChart += 1;

    if (e) {
      monthArgs = e.detail.month;
    } else {
      localStorage.setItem("month", options[nowMonth]);
    }

    monthArgs = localStorage.getItem("month") || "";
    machineArgs = localStorage.getItem("machineKey") || "";

    const url = `${
      import.meta.env["VITE_BACK"]
    }/back/api/v1/getInformation?month=${monthArgs}&machine=${machineArgs}&unit=${unit}`;

    const res = await fetch(url, {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    });

    const resJson = await res.json();

    const stackedBar = new Chart(chartConnect, {
      type: "bar",
      data: {
        labels: resJson.days,
        datasets: [
          {
            label: "1º Turno",
            data: resJson.firstShift,
            backgroundColor: "#00b2ff",
          },
          {
            label: "2º Turno",
            data: resJson.secondShift,
            backgroundColor: "#00628c",
          },
          {
            label: "3º Turno",
            data: resJson.thirdShift,
            backgroundColor: "#002367",
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 30,
          },
        },
      },
    });
  }

  generateChart();
</script>

{#key attChart}
  <main id="layout-chart">
    <div id="buttons">
      {#each options as month}
        <ChartButton
          aux={localStorage.getItem("month")}
          on:dateParam={generateChart}
          text={month}
        />
      {/each}
    </div>
    <div class="chart">
      <canvas bind:this={chartConnect} />
    </div>
  </main>
{/key}

<style>
  * {
    box-sizing: border-box;
  }

  .chart {
    width: 100%;
    min-height: 400px;
    height: 400px;
  }

  #layout-chart {
    min-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 25px;
    width: 100%;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 740px) {
    #layout-chart {
      display: flex;
      flex-direction: column;
    }

    #buttons {
      margin-top: 1rem;
    }
  }
</style>
