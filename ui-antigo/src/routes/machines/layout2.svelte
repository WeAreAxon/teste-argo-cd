<script>
  import Nav from "../../components/nav/nav.svelte";
  import OeeChart from "../../components/charts/oeeChart.svelte";
  import Eficiencia from "../../components/charts/eficiencia.svelte";
  import ButtonConfirm from "../../components/buttons/buttonConfirm.svelte";
  import PieOee from "../../components/chartslay2/pieOee.svelte";
  import PieTotal from "../../components/chartslay2/pieTotal.svelte";
  import PieAtual from "../../components/chartslay2/pieAtual.svelte";
  import PieNoConformidades from "../../components/chartslay2/pieNãoConformidade(s).svelte";
  import ChartWSlay2 from "../../components/chartslay2/chartWSlay2.svelte";
  import PieTurnos from "../../components/chartslay2/pieTurnos.svelte";
  import ChartLine from "../../components/chartslay2/chartLine.svelte";
  import MachineCards from "../../components/chartslay3/machineCards.svelte";
  import Card4Machines from "../../components/cards/card4Machines.svelte";

  const contents = {};
  let working = [];
  let stopped = [];
  let totalWorkingStopped = [];

  export let title0; // MÉDIA GOLPES, CORTES OU SL
  export let title1; // GPM  CPM
  export let title2; // GPH CPH

  const genChartInformation = async () => {
    const machineCod = localStorage.getItem("machineKey");

    const res = await fetch(
      `${
        import.meta.env["VITE_BACK"]
      }/back/api/v1/getInformation/dashboard/${machineCod}`,
      {
        method: "Get",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const resJson = await res.json();

    contents["Meta"] = resJson[0]["META"];
    contents["Produtividade"] = 0;

    switch (resJson[0]["CATEGORYCOUNT"]) {
      case "Golpes":
        contents["Média GPM"] = resJson[0]["GPM"];
        contents["Golpes"] = resJson[0]["GOLPES"];
        title0 = "Média de Golpes";
        title1 = "Golpes por Minuto";
        title2 = "Golpes por Hora";
        break;
      case "Cortes":
        contents["Média CPM"] = resJson[0]["GPM"];
        contents["Cortes"] = resJson[0]["GOLPES"];
        title0 = "Média de Cortes";
        title1 = "Cortes por Minuto";
        title2 = "Cortes por Hora";
        break;
      case "Voltas":
        contents["Média CPM"] = resJson[0]["GPM"];
        contents["Voltas"] = resJson[0]["GOLPES"];
        title0 = "Média de Volta";
        title1 = "Volta por Minuto";
        title2 = "Voltas por Hora";
      default:
        title0 = "Média Máquina";
        title1 = "Média por Minuto";
        title2 = "Média por Hora";
        break;
    }

 

    totalWorkingStopped = resJson[0]["TOTAL_TIME"];
    working = resJson[0]["WORK_TIME"];
    stopped = resJson[0]["STOP_TIME"];

    return resJson;
  };

  const chartInfo = genChartInformation();

  export let tp = "00:00:00"; // define o Tempo Planejado do gráfico de WS
  export let ton = "00:00:00"; // define o Tempo Decorrido do gráfico de WS
  export let pp = "00:00:00"; // define a Pausa Planejada do gráfico de WS
  export let pnp = "00:00:00"; // define a Pausa Não Planejada do gráfico de WS

  export let oeevalue = "0%"; // define o valor da OEE da semana do gráfico de Line
</script>

<Nav navRef="/#/card">
  {#await chartInfo}
    <main class="gif">
      <img src="/static/loader.gif" alt="logo" width="270" />
    </main>
  {:then contentsInformation}
    <div id="container">
      <div id="unity">
        <div id="chart-pie">
          <div id="doughnut">
            <PieOee />
          </div>

          <div id="doughnut">
            <PieTotal producao={contentsInformation[0]["DISP_MOMENTO_TOTAL"]} />
          </div>

          <div id="doughnut">
            <PieAtual
              producao={contentsInformation[0]["DISP_MOMENTO_PERCENT"]}
            />
          </div>

          <div id="doughnut">
            <PieNoConformidades />
          </div>
        </div>

        <div id="chartWS">
          <div id="SWPD1">
            <div id="chart-triple">
              <h1>W / S Diário</h1>
              <ChartWSlay2 workingTime={working} stoppedTime={stopped} />
              <div class="meio-container">
                <div class="meio-left">
                  <h2 class="tp">Tempo Planejado: <span>{tp}</span></h2>
                  <h2 class="ton">Tempo Decorrido: <span>{ton}</span></h2>
                </div>
                <div class="meio-right">
                  <h2 class="pp">Pausas Planejadas: <span>{pp}</span></h2>
                  <h2 class="pnp">Pausas Não Planejadas: <span>{pnp}</span></h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="right">
        <div id="polar">
          <div id="pie">
            <h1>OEE Turnos</h1>
            <PieTurnos />
          </div>
        </div>

        <div id="chart-right">
          <div class="legenda-line">
            <h1>OEE SEMANAL</h1>
            <h3 class="just-space">{oeevalue}</h3>
          </div>

          <div id="line">
            <ChartLine />
          </div>
        </div>
      </div>
    </div>

    <div id="cards">
      {#each Object.keys(contents) as contentText}
        <div id="card-options">
          {#if contentText === "Produtividade" || contentText === "refugo"}
            <Card4Machines
              action="disable"
              {contentText}
              contentValue=""
              contentPorcent=""
            />
          {:else}
            <Card4Machines
              {contentText}
              contentValue={contents[contentText]}
              contentPorcent=""
            />
          {/if}
        </div>
      {/each}
    </div>

    <div id="outro">
      <div id="SWPD">
        <div id="chart-triple">
          <h1>OEE Mensal</h1>
          <OeeChart />
        </div>
      </div>
    </div>
    <div id="other">
      <div id="SWPD">
        <div id="chart-triple">
          <h1>{title0}</h1>

          <div id="home-add">
            <ButtonConfirm
              refBtnConfirm="/#/charts/geral"
              funcConfirm={() => {}}
              textConfirm={title1}
            />

            <ButtonConfirm
              refBtnConfirm="/#/charts/geral"
              funcConfirm={() => {}}
              textConfirm={title2}
            />
          </div>
        </div>
        <Eficiencia />
      </div>
    </div>
  {/await}
</Nav>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

  .gif {
    height: calc(100% - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #container {
    width: 100%;
    display: flex;
  }

  #unity {
    width: 75%;
    padding: 1%;
  }

  #right {
    width: 25%;
    padding: 1%;
    height: fit-content;
    flex-wrap: wrap;
  }

  #chart-triple {
    width: 100%;
    height: fit-content;
  }

  #chart-pie {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    border-radius: 5px;
    height: fit-content;
    justify-content: space-around;
    background-color: #ffffff;
    box-shadow: 1px 1px 10px #00000050;
    padding-bottom: 1%;
    margin-bottom: 1%;
  }

  #chartWS {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-radius: 5px;
    padding-bottom: 1%;
    height: fit-content;
    justify-content: space-around;
    background-color: #ffffff;
    box-shadow: 1px 1px 10px #00000050;
  }

  .meio-container {
    display: flex;
    padding-top: 2%;
  }

  .meio-left {
    width: 50%;
  }

  .meio-left h2 {
    font-family: "Gotham", sans-serif;
    color: #000000;
  }

  .meio-right {
    width: 50%;
    text-align: end;
  }

  .meio-right h2 {
    color: #000000;
    font-family: "Gotham", sans-serif;
  }

  .tp span {
    font-weight: 500;
    color: #09ae87;
    font-family: "Gotham", sans-serif;
  }

  .pp span {
    font-weight: 500;
    color: #858585;
    font-family: "Gotham", sans-serif;
    padding-left: 7%;
  }

  .ton span {
    font-weight: 500;
    color: #00b2ff;
    font-family: "Gotham", sans-serif;
  }

  .pnp span {
    font-weight: 500;
    color: #858585;
    font-family: "Gotham", sans-serif;
  }

  .just-space {
    padding-top: 6%;
    padding-bottom: 20.1%;
  }

  #polar {
    display: flex;
    height: fit-content;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 10px;
    border-radius: 5px;
    box-shadow: 1px 1px 10px #00000050;
    background-color: #ffffff;
    padding-bottom: 14%;
    margin-bottom: 3.4%;
  }

  #chart-right {
    display: flex;
    justify-content: space-around;
    height: fit-content;
    width: 100%;
    border-radius: 5px;
    transition: 0.3s;
    box-shadow: 1px 1px 10px #00000050;
    background-color: #ffffff;
    flex-direction: column;
  }

  #chart-right h1 {
    font-size: 15px;
    color: #000000;
    font-weight: 500;
    text-align: center;
    font-family: "Gotham", sans-serif;
  }

  #chart-right h3 {
    font-size: 35px;
    color: #858585;
    font-weight: 500;
    text-align: center;
    font-family: "Gotham", sans-serif;
  }

  #line {
    width: 100%;
    height: 180px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #doughnut {
    height: 196px;
    margin-top: -1.5%;
  }

  #pie {
    height: 150px;
    padding-bottom: 1%;
  }

  #pie h1 {
    font-size: 12px;
    color: #000000;
    font-weight: bold;
    text-align: center;
    font-family: "Gotham";
  }

  #cards {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  #card-options {
    width: 50%;
    height: 160px;
    padding: 1%;
  }

  #outro {
    width: 100%;
    padding: 1%;
  }

  #other {
    width: 100%;
    padding: 1%;
  }

  #SWPD {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 1px 1px 10px #00000060;
  }

  #SWPD h1 {
    font-family: "Gotham", sans-serif;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    margin-top: 2%;
  }

  #SWPD1 {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 90%;
    margin-left: -4%;
  }

  #SWPD1 h1 {
    font-family: "Gotham", sans-serif;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    margin-top: 6%;
  }

  #home-add {
    display: flex;
    align-items: center;
    justify-content: space-between;
    justify-content: center;
  }

  @media screen and (min-width: 1920px) {
    #doughnut {
      height: 170px;
      margin-top: 1.2%;
      padding-bottom: 1%;
    }

    .just-space {
      padding-top: 6%;
      padding-bottom: 19%;
    }

    .pp span {
      padding-left: 6%;
    }
  }

  @media screen and (min-width: 2630px) {
    .just-space {
      padding-top: 6%;
      padding-bottom: 4%;
    }

    #line {
      width: 100%;
      height: 300px;
    }

    #polar {
      padding-bottom: 10%;
    }

    #chart-right h1 {
      font-size: 18px;
    }

    #chart-right h3 {
      font-size: 45px;
    }

    .pp span {
      padding-left: 3%;
    }

    #card-options {
      height: 220px;
    }
  }

  @media screen and (max-width: 700px) {
    #container {
      flex-wrap: wrap;
    }

    #unity {
      width: 100%;
      padding: 4%;
    }

    .meio-container {
      display: flex;
      flex-direction: column;
      padding-top: 2%;
      align-items: center;
    }

    .meio-left {
      width: 60%;
      text-align: center;
    }

    .meio-right {
      width: 60%;
      text-align: center;
    }
    .pp span {
      padding-left: 0%;
    }

    #right {
      width: 100%;
      padding: 4%;
      height: fit-content;
      flex-wrap: wrap;
    }

    #cards {
      width: 100%;
      padding: 4%;
    }

    #card-options {
      width: 100%;
      height: 160px;
      padding: 1%;
    }

    #outro {
      width: 100%;
      padding: 4%;
    }

    #other {
      width: 100%;
      padding: 4%;
    }
  }
</style>
