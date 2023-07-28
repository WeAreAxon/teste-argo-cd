<script>
  // import MachineCards from "../../components/chartslay3/machineCards.svelte";
  import Nav from "../../components/nav/nav.svelte";
  import ChartDispo from "../../components/chartslay3/chartDispo.svelte";
  import SpiderWeb from "../../components/chartslay3/spiderWeb.svelte";
  import DoublepieOee from "../../components/chartslay3/doublepieOEE.svelte";
  import ChartWSlay3 from "../../components/chartslay3/chartWSlay3.svelte";
  import ProgressRefugo from "../../components/chartslay3/progressRefugo.svelte";
  import ProgressRetrabalho from "../../components/chartslay3/progressRetrabalho.svelte";
  import ProgressDobra from "../../components/chartslay3/progressDobra.svelte";
  import ProgressRespingo from "../../components/chartslay3/progressRespingo.svelte";
  import ProgressAcabamento from "../../components/chartslay3/progressAcabamento.svelte";
  import OeeChart from "../../components/charts/oeeChart.svelte";
  import ButtonConfirm from "../../components/buttons/buttonConfirm.svelte";
  import Eficiencia from "../../components/charts/eficiencia.svelte";
  import Card4Machines from "../../components/cards/card4Machines.svelte";

  const contents = {};

  export let tp = "00:00:00"; // define o Tempo Planejado do gráfico de WS
  export let ton = "00:00:00"; // define o Tempo Decorrido do gráfico de WS
  export let pp = "00:00:00"; // define a Pausa Planejada do gráfico de WS
  export let pnp = "00:00:00"; // define a Pausa Não Planejada do gráfico de WS

  export let texto; // definir se for gpm cortes etc
  export let texto2; // definir se for gpm cortes etc exemplo : Cortes

  export let title0 = "Média de Golpes"; //a definir
  export let title1 = "Golpes por Minuto"; //a definir
  export let title2 = "Golpes por Hora"; //a definir

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
      default:
        contents["Produção"] = resJson[0]["GOLPES"];
        title0 = "Média Máquina";
        title1 = "Média por Minuto";
        title2 = "Média por Hora";
        break;
    }

    contents["Golpes"] = resJson[0]["GOLPES"];

  

    // totalWorkingStopped = resJson[0]["TOTAL_TIME"];
    // working = resJson[0]["WORK_TIME"];
    // stopped = resJson[0]["STOP_TIME"];

    return resJson;
  };

  const chartInfo = genChartInformation();
</script>

<Nav navRef="/#/card">
  {#await chartInfo}
    <main class="gif">
      <img src="/static/loader.gif" alt="logo" width="270" />
    </main>
  {:then contentsInformation}
    <div id="container">
      <div id="unity">
        <div id="top">
          <div id="cards">

            {#each Object.keys(contents) as contentText}
              <div class="option-1">
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
          <div id="OEE">
            <div class="doughnut">
              <DoublepieOee />
            </div>
          </div>
        </div>

        <div id="bottom">
          <div id="progress-NC">
            <div class="space-progress">
              <ProgressRefugo />
            </div>
            <div class="space-progress">
              <ProgressRetrabalho />
            </div>
            <div class="space-progress">
              <ProgressDobra />
            </div>
            <div class="space-progress">
              <ProgressRespingo />
            </div>
            <div class="space-progress">
              <ProgressAcabamento />
            </div>
          </div>
          <div id="web-NC">
            <SpiderWeb />
          </div>
          <div id="disponibilidade">
            <ChartDispo
              producao={contentsInformation[0]["DISP_MOMENTO_TOTAL"]}
              producaoatual={contentsInformation[0]["DISP_MOMENTO_PERCENT"]}
            />
          </div>
        </div>
      </div>
      <div id="direita">
        <div id="chartWS">
          <div class="editWS">
            <ChartWSlay3 />
          </div>
          <div class="infos-container">
            <div class="infos-left">
              <h2 class="tp">Tempo Planejado: <span>{tp}</span></h2>
              <h2 class="ton">Tempo Decorrido: <span>{ton}</span></h2>
            </div>
            <div class="infos-right">
              <h2 class="pp">Pausas Planejadas: <span>{pp}</span></h2>
              <h2 class="pnp">Pausas Não Planejadas: <span>{pnp}</span></h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="outros">
      <div id="oee-mes">
        <h1>OEE Mensal</h1>
        <OeeChart />
      </div>
    </div>

    <div id="others">
      <div id="home">
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
        <Eficiencia />
      </div>
    </div>
  {/await}
</Nav>

<style>
  #container {
    width: 100%;
    display: flex;
  }

  #unity {
    width: 90%;
  }

  #top {
    width: 100%;
    display: flex;
    padding: 1%;
  }

  #cards {
    width: 60%;
    display: flex;
    flex-wrap: wrap;
  }

  .option-1 {
    width: 50%;
    padding: 4px;
    display: flex;
    flex-wrap: wrap;
  }

  #OEE {
    width: 39%;
    height: 316px;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 1px 1px 10px #00000060;
    margin-left: 0.7%;
  }

  #bottom {
    width: 100%;
    height: fit-content;
    display: flex;
    padding: 1%;
  }

  #progress-NC {
    width: 40%;
    height: fit-content;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 1px 1px 10px #00000060;
    margin: 0.2%;
    padding: 0.7%;
  }

  .space-progress {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #web-NC {
    width: 40%;
    height: fit-content;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 1px 1px 10px #00000060;
    margin: 0.2%;
    padding: 1%;
  }

  #disponibilidade {
    width: 20%;
    height: fit-content;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 1px 1px 10px #00000060;
    margin: 0.2%;
    padding: 1%;
  }

  #direita {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: fit-content;
    padding: 1%;
  }

  #chartWS {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 618px;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 1px 1px 10px #00000060;
    justify-content: center;
    align-items: center;
  }

  .editWS {
    display: flex;
    width: 60%;
  }

  .infos-container {
    display: flex;
    padding-top: 2%;
    padding: 3%;
  }

  .infos-left {
    width: 50%;
    text-align: center;
  }

  .infos-right {
    width: 50%;
    text-align: center;
  }

  .infos-left h2 {
    font-size: 10px;
    font-family: "Gotham", sans-serif;
    color: #000000;
  }

  .infos-right h2 {
    font-size: 10px;
    font-family: "Gotham", sans-serif;
    color: #000000;
  }

  .tp span {
    font-size: 14px;
    font-weight: 500;
    color: #09ae87;
    font-family: "Gotham", sans-serif;
  }

  .pp span {
    font-size: 14px;
    font-weight: 500;
    color: #858585;
    font-family: "Gotham", sans-serif;
  }

  .ton span {
    font-size: 14px;
    font-weight: 500;
    color: #00b2ff;
    font-family: "Gotham", sans-serif;
  }

  .pnp span {
    font-size: 14px;
    font-weight: 500;
    color: #858585;
    font-family: "Gotham", sans-serif;
  }

  #outros {
    width: 100%;
    padding: 1%;
    display: flex;
    height: fit-content;
    flex-direction: column;
  }

  #outros h1 {
    font-family: "Gotham", sans-serif;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    margin-top: 1%;
  }

  #oee-mes {
    /* background-color: #00b2ff; */
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 1px 1px 10px #00000060;
  }

  #home-add {
    display: flex;
    align-items: center;
    justify-content: space-between;
    justify-content: center;
  }

  #others {
    width: 100%;
    padding: 1%;
    display: flex;
    height: fit-content;
    flex-direction: column;
  }

  #others h1 {
    font-family: "Gotham", sans-serif;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    margin-top: 1%;
  }

  #home {
    /* background-color: #00b2ff; */
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 1px 1px 10px #00000060;
  }

  @media screen and (min-width: 1920px) {
    #chartWS {
      height: 630px;
    }
  }
  @media screen and (min-width: 2630px) {
    #chartWS {
      height: 690px;
    }

    #progress-NC {
      margin: 0.2%;
      padding: 2.1%;
    }
  }
  @media screen and (max-width: 768px) {
    #container {
      display: flex;
      flex-direction: column;
    }

    #unity {
      width: 100%;
    }

    #top {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 4%;
    }

    #cards {
      width: 100%;
      padding: 1%;
    }

    #card-options {
      width: 100%;
      height: 160px;
      padding: 1%;
    }

    .option-1 {
      display: flex;
      flex-direction: column;
    }

    .option-2 {
      display: flex;
      flex-direction: column;
    }

    #OEE {
      width: 100%;
      margin-left: 0%;
    }

    #bottom {
      display: flex;
      flex-direction: column;
      padding: 4%;
    }

    #progress-NC {
      width: 100%;
      margin: 0%;
      padding: 4%;
    }

    #web-NC {
      width: 100%;
      margin-top: 1%;
    }

    #disponibilidade {
      width: 100%;
      margin-top: 1%;
    }

    #direita {
      width: 100%;
      padding: 4%;
    }

    #chartWS {
      height: 718px;
    }

    .infos-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .infos-left {
      width: 80%;
      text-align: center;
    }

    .infos-right {
      width: 80%;
      text-align: center;
    }
    .pp span {
      padding-left: 0%;
    }

    .infos-left h2 {
      font-size: 14px;
      font-family: "Gotham", sans-serif;
      color: #000000;
    }

    .infos-right h2 {
      font-size: 14px;
      font-family: "Gotham", sans-serif;
      color: #000000;
    }

    .tp span {
      font-size: 16px;
      font-weight: 500;
      color: #09ae87;
      font-family: "Gotham", sans-serif;
    }

    .pp span {
      font-size: 16px;
      font-weight: 500;
      color: #09ae87;
      font-family: "Gotham", sans-serif;
    }

    .ton span {
      font-size: 16px;
      font-weight: 500;
      color: #00b2ff;
      font-family: "Gotham", sans-serif;
    }

    .pnp span {
      font-size: 16px;
      font-weight: 500;
      color: #db3233;
      font-family: "Gotham", sans-serif;
    }

    #outros {
      padding: 4%;
    }

    #others {
      padding: 4%;
    }
  }
</style>
