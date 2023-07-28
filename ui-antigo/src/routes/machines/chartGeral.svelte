<script>
  // @ts-nocheck

  import Nav from "../../components/nav/nav.svelte";
  import Card4Machines from "../../components/cards/card4Machines.svelte";
  import ChartDia from "../../components/charts/chartDia.svelte";
  import ChartCircle from "../../components/charts/chartCircle.svelte";

  import OeeChart from "../../components/charts/oeeChart.svelte";
  import ChartDia2 from "../../components/charts/chartDia2.svelte";
  import Eficiencia from "../../components/charts/eficiencia.svelte";
  import ChartProducao from "../../components/charts/chartProducao.svelte";
  import ButtonConfirm from "../../components/buttons/buttonConfirm.svelte";
  import ChartWSlay2 from "../../components/chartslay2/chartWSlay2.svelte";
  import FilterButton from "../../components/buttons/filterButton.svelte";
  import Downloading from "../../components/loader/downloading.svelte";

  const contents = {};
  let isLoading = false;
  let isGeneratingCSV = false;

  let carregaTimeLine = 0;
  let recarregar = 0;
  // let working = [];
  // let stopped = [];

  let getTimeline;
  let metaMachine;
  let categoryMachine;
  let hitsMachine;
  let MachineGPM;

  export let title0; // MÉDIA GOLPES, CORTES OU SL
  export let title1; // GPM  CPM
  export let title2; // GPH CPH

  let carregaEficiencia = 0;
  // function tempos(unit) {
  //   localStorage.setItem("unit", unit);
  //   carregaEficiencia += 1;
  //   console.log(carregaEficiencia);
  // }

  let dispInformation;

  const genChartInformation = async (e) => {
    const machineCod = localStorage.getItem("machineKey");

    const USearch = new URL(
      `${import.meta.env["VITE_BACK"]}/back/api/v1/search`
    );

    USearch.searchParams.append("nameMachine", "Geral");
    USearch.searchParams.append("shift", `${0}`);
    USearch.searchParams.append(
      "fromDate",
      `${localStorage.getItem("fromDate")}`
    );
    USearch.searchParams.append("toDate", `${localStorage.getItem("toDate")}`);
    USearch.searchParams.append("serialNumbers", `${[machineCod]}`);
    USearch.searchParams.append("route", "chartGeral");

    dispInformation = await fetch(USearch, {
      method: "Get",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => res.json());

    getTimeline = await fetch(
      `${
        import.meta.env["VITE_BACK"]
      }/back/api/v1/information/timeline?machine=${machineCod}`,
      {
        method: "Get",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then(async (res) => res.json());

    metaMachine = await fetch(
      `${
        import.meta.env["VITE_BACK"]
      }/back/api/v1/getMeta/dashboard/${machineCod}`,
      {
        method: "Get",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then(async (res) => res.json());

    categoryMachine = await fetch(
      `${
        import.meta.env["VITE_BACK"]
      }/back/api/v1/getCategory/dashboard/${machineCod}/${localStorage.getItem(
        "turno"
      )}/${localStorage.getItem("fromDate")}/${localStorage.getItem("toDate")}`,
      {
        method: "Get",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then(async (res) => res.json());

    hitsMachine = await fetch(
      `${
        import.meta.env["VITE_BACK"]
      }/back/api/v1/getHits/dashboard/${machineCod}/${localStorage.getItem(
        "turno"
      )}/${localStorage.getItem("fromDate")}/${localStorage.getItem("toDate")}`,
      {
        method: "Get",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then(async (res) => res.json());

    MachineGPM = await fetch(
      `${
        import.meta.env["VITE_BACK"]
      }/back/api/v1/getMedia/dashboard/${machineCod}`,
      {
        method: "Get",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then(async (res) => res.json());

    contents["Meta"] = metaMachine[0]["META"];
    contents["Produtividade"] = 0;
    if (!isGeneratingCSV) {
      switch (categoryMachine[0]["CategoryCount"]) {
        case "Golpes":
          contents["Média GPM"] = MachineGPM[0]["GPM"];
          contents["Golpes"] = Math.round(hitsMachine[0]["GOLPES"]);
          title0 = "Média de Golpes";
          title1 = "Golpes por Minuto";
          title2 = "Golpes por Hora";
          break;
        case "Cortes":
          contents["Média CPM"] = MachineGPM[0]["GPM"];
          contents["Cortes"] = Math.round(hitsMachine[0]["GOLPES"]);
          title0 = "Média de Cortes";
          title1 = "Cortes por Minuto";
          title2 = "Cortes por Hora";
          break;
        case "Voltas":
          contents["Média VPM"] = MachineGPM[0]["GPM"];
          contents["Voltas"] = Math.round(hitsMachine[0]["GOLPES"]);
          title0 = "Média de Voltas";
          title1 = "Voltas por Minuto";
          title2 = "Voltas por Hora";
          break;
        case "Peças":
          contents["Média PPM"] = MachineGPM[0]["GPM"];
          contents["Peças"] = Math.round(hitsMachine[0]["GOLPES"]);
          title0 = "Média de Peças";
          title1 = "Peças por minuto";
          title2 = "Peças por hora";
          break;
        case "Dobras":
          contents["Média DPM"] = MachineGPM[0]["GPM"];
          contents["Dobras"] = Math.round(hitsMachine[0]["GOLPES"]);
          title0 = "Média de Dobras";
          title1 = "Dobras por minuto";
          title2 = "Dobras por hora";
          break;
        default:
          contents["Produção por Minuto"] = MachineGPM[0]["GPM"];
          contents["Produção"] = Math.round(hitsMachine[0]["GOLPES"]);
          title0 = "Média Máquina";
          title1 = "Média por Minuto";
          title2 = "Média por Hora";
          break;
      }
    }

    if (carregaTimeLine >= 30) {
      carregaTimeLine = 1;
    }

    localStorage.setItem("load", String(carregaTimeLine + 1));
    recarregar = Number(localStorage.getItem("load"));
  };

  let buttonConfirmUm = false;
  let buttonConfirmDois = false;

  let chartInfo = genChartInformation();

  async function downloadCsv() {
    isLoading = true;

    let fromDate = new Date(localStorage.getItem("fromDate"));
    let toDate = new Date(localStorage.getItem("toDate"));
    let pageData;

    if (!dispInformation.length) {
      isLoading = false;
      return [];
    }

    let csvString = [
      [
        "SERIAL_NUMBER",
        "MAQUINA",
        "GOLPES",
        "META",
        "TOTAL TRABALHADO",
        "NAO TRABALHADO",
        "DATA INICIO",
        "DATA FINAL",
      ],
    ];

    for (let i = new Date(fromDate); i < toDate; i.setDate(i.getDate() + 1)) {
      isGeneratingCSV = true;
      const indexDate = new Date(i).setDate(i.getDate() - 1);
      const generationDateString = new Date(indexDate)
        .toISOString()
        .slice(0, 19)
        .split("T")[0];
      const oneDaySinceIndexDate = i.toISOString().slice(0, 19).split("T")[0];

      localStorage.setItem("fromDate", generationDateString);
      localStorage.setItem("toDate", generationDateString);

      pageData = await genChartInformation();
      await Promise.resolve(pageData);

      if (
        pageData.length &&
        !Object.prototype.hasOwnProperty.call(pageData[0], "WORKING_TIME")
      ) {
        continue;
      }

      const valuesObject = [
        pageData[0].WORKING_TIME.SERIAL_NUMBER,
        pageData[0].WORKING_TIME.MACHINE,
        Math.round(pageData[0].GOLPES) || 0,
        pageData[0].META || 0,
        pageData[0].WORKING_TIME.total_working_min,
        pageData[0].WORKING_TIME.total_isnot_working_min,
        generationDateString,
        oneDaySinceIndexDate,
      ];

      csvString.push(valuesObject);

      localStorage.setItem("fromDate", generationDateString);
      localStorage.setItem("toDate", oneDaySinceIndexDate);
    }

    csvString = csvString.map((e) => e.join(";")).join("\n");

    const element = document.createElement("a");

    element.setAttribute("href", `data:text/csv;charset=utf-8, ${csvString}`);
    element.setAttribute("download", "download.csv");

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    isLoading = false;
  }
</script>

<Nav navRef="/#/card" title={localStorage.getItem("machineName")}>
  {#await chartInfo}
    <main class="gif">
      <img src="/static/loader.gif" alt="logo" width="270" />
    </main>
  {:then contentsInformation}
    <div class="menu-charts">
      <div id="OE">
        <ChartProducao />
      </div>

      <div class="progress-bar">
        <div id="chartQualidade">
          <ChartDia
            percent={Math.round(
              dispInformation.length > 1 ? dispInformation[0].progress : 0
            )}
          />
        </div>

        <div id="chartDisponibilidade">
          <ChartDia2
            percent={Math.round(
              dispInformation.length > 1 ? dispInformation[1].progress : 0
            )}
          />
        </div>
      </div>

      <div id="doughnut">
        <ChartCircle />
      </div>
    </div>

    <div id="forCards">
      {#each Object.keys(contents) as contentText}
        <div class="card-img">
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

    <div id="SWPD">
      <div id="chart-triple">
        <div id="chartWS">
          <div id="SWPD1">
            <div id="chart-unic">
              <h1>W / S Diário</h1>

              {#await getTimeline}
                Carregando
              {:then timeline}
                <ChartWSlay2
                  workingTime={timeline.todayTimelineFuncionando}
                  stoppedTime={timeline.todayTimelineParado}
                />
              {/await}
              <!-- <ChartWSlay2 /> -->
            </div>
          </div>
        </div>
        <h1>OEE Mensal</h1>
        <OeeChart />
        <h1>{title0}</h1>
        <div id="home-add">
          <ButtonConfirm
            refBtnConfirm="/#/charts/geral"
            funcConfirm={() => {
              localStorage.setItem("unit", "minute");
              buttonConfirmUm = buttonConfirmUm == false ? true : false;
              carregaEficiencia += 1;

              if (buttonConfirmUm === true && buttonConfirmDois === true) {
                buttonConfirmDois = false;
              }
            }}
            textConfirm={title1}
            selected={buttonConfirmUm == true ? "selected" : ""}
          />

          <ButtonConfirm
            refBtnConfirm="/#/charts/geral"
            funcConfirm={() => {
              localStorage.setItem("unit", "hour");
              buttonConfirmDois = buttonConfirmDois == false ? true : false;
              carregaEficiencia += 1;
              console.log(carregaEficiencia);

              if (buttonConfirmDois === true && buttonConfirmUm === true) {
                buttonConfirmUm = false;
              }
            }}
            textConfirm={title2}
            selected={buttonConfirmDois == true ? "selected" : ""}
          />
          {#key isLoading}
            {#if isLoading}
              <Downloading
                tailwindClass="btn btn-light shacow-sm bg-[#2563EB] text-white p-[4px] rounded-[4px] hover:bg-[#1D4ED8] h-[2.5rem]"
              />
            {:else}
              <FilterButton
                tailwindClass="btn btn-light shacow-sm bg-[#2563EB] text-white p-[4px] rounded-[4px] hover:bg-[#1D4ED8] h-[2.5rem] "
                textButton=""
                setFunction={downloadCsv}
                classIcon="fas fa-download"
                stats=""
              />
            {/if}
          {/key}
        </div>
        {#key carregaEficiencia}
          <Eficiencia />
        {/key}
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

  #chart-triple {
    width: 100%;
    height: fit-content;
  }

  .card-img {
    width: 300px;
    height: 130px;
  }

  .menu-charts {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: fit-content;
    flex-wrap: wrap;
    padding-top: 40px;
    row-gap: 2rem;
  }

  .progress-bar {
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: -4%;
    margin-left: -7%;
  }

  #chartDisponibilidade {
    margin-top: -32%;
    width: 400px;
    height: 100px;
  }
  #chartQualidade {
    width: 100%;
    height: 100%;
  }

  #doughnut {
    height: 150px;
    margin-top: -1.5%;
  }

  #OE {
    width: 400px;
    height: 200px;
    margin-left: -6%;
  }

  #forCards {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 2%;
    row-gap: 1rem;
  }

  #SWPD {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 2%;
    row-gap: 1rem;
  }

  #SWPD h1 {
    font-family: "Gotham", sans-serif;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    margin-top: 2%;
  }

  #home-add {
    display: flex;
    align-items: center;
    justify-content: space-between;
    justify-content: center;
  }

  #SWPD1 {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 90%;
  }

  #chartWS {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-radius: 5px;
    padding-bottom: 1%;
    height: fit-content;
    justify-content: space-around;
  }

  #chart-unic {
    width: 100%;
    height: fit-content;
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
    padding-left: 5.2%;
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

  @media screen and (max-width: 400px) {
    #chartDisponibilidade {
      margin-top: -32%;
      width: 350px;
      height: 100px;
    }

    #chartQualidade {
      width: 100%;
      height: 100%;
    }

    .meio-container {
      display: flex;
      flex-direction: column;
    }

    .meio-left {
      width: 100%;
      text-align: center;
    }

    .meio-right {
      width: 100%;
      text-align: center;
    }

    .pp span {
      padding-left: 0%;
    }
  }
  @media screen and (max-width: 700px) {
    .progress-bar {
      height: 100%;
      display: flex;
      flex-direction: column;
      margin-top: -20%;
      margin-left: 0%;
    }
    #OE {
      width: 400px;
      height: 180px;
      padding-left: 15%;
      margin-left: 0%;
    }
  }
  @media screen and (min-width: 2630px) {
    .progress-bar {
      height: 100%;
      display: flex;
      flex-direction: column;
      margin-top: -2%;
      margin-left: -7%;
    }
    #doughnut {
      height: 150px;
      margin-top: -1%;
    }
  }
</style>