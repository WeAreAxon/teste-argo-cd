<script>
  import { push } from "svelte-spa-router";

  export let information;

  export let text = "";
  export let ping = "black";

  let trussSixMeters;
  let trussTwelveMeters;

  if (
    information.type === "Treliça" &&
    Object.prototype.hasOwnProperty.call(information, "total_hits_six")
  ) {
    trussSixMeters = information.total_hits_six;
    trussTwelveMeters = information.total_hits_twelve;
  }

  export let hits = !isNaN(Number(information.total_hits)) ?  Math.round(information.total_hits) : information.total_hits;

  export let machine = information.MACHINE;
  export let progressEndValue = Math.round(information.progress);

  export let typeHit = information.countCategory;
  export let turnoSelect =
    information.SHIFT === 0 ? "Geral" : information.SHIFT;

  export let machineSerial = information.SERIAL_NUMBER;
  export let percentMeta = information.percentMeta;

  export let machineIsWorking = information.total_working_min;
  export let machineIsNotWorking = information.total_not_min;

  let opStatus = "opacity-0";
  let peStatus = "pointer-events-none";

  let opPerc = "opacity-100";
  let pePerc = "pointer-events-none";

  let bgCircle = "bg-card_white";

  let textContent = 0;
  let speed = 3;

  let progress = setInterval(async () => {
    if (textContent > progressEndValue) {
      textContent--;
    } else if (textContent < progressEndValue) {
      textContent++;
    } else {
      clearInterval(progress);
    }
  }, speed);

  const setMachineTo = () => {
    localStorage.setItem("machineKey", machineSerial);
    localStorage.setItem("machineName", machine);

    if (information.type !== "Puncio") {
      push("/charts/geral");
    }
  };

  const showStatus = () => {
    opPerc = "opacity-0";
    opStatus = "opacity-100";

    bgCircle = text === "ON" ? "bg-green_warn_circle" : "bg-red_warn_circle";
  };

  const hideStatus = () => {
    opStatus = "opacity-0";
    opPerc = "opacity-100";

    bgCircle = "bg-card_white";
  };

  $: style = `<style> html { font-size: 62.5%; } </style>`;

  let heighCard = "h-[59.8rem]";
  let paddingCard = "p-[5rem]";
  let marginBottomStatusBar = "mb-[49rem]";

  if (information.type === "Treliça") {
    paddingCard = "p-[4rem]";
  }

  if (information.type === "Puncio") {
    marginBottomStatusBar = "mb-[47.5rem]";
  }
</script>

{@html style}

{#key heighCard}
  <div
    class="container {heighCard} flex justify-center items-center w-full md_cards:w-[40%] xl:w-[23%]"
  >
    {#if ping === "online"}
      <div
        class="w-[34rem] h-[1.9rem] absolute {marginBottomStatusBar} rounded-t-[29px] bg-gradient-to-b from-[#00FF6C70] to-transparent"
      />
    {:else}
      <div
        class="w-[34rem] h-[1.9rem] absolute {marginBottomStatusBar} rounded-t-[15px] bg-gradient-to-b from-[#EE5355] to-transparent"
      />
    {/if}

    <div
      class="card w-[34rem] flex flex-col rounded-[2rem] bg-light_white_card shadow-card_shadow {paddingCard} cursor-pointer hover:bg-[#CCFFFF]"
      on:click={setMachineTo}
    >

      <div
        class="card__percent relative flex justify-center items-center mb-[5rem]"
      >
        <svg
          class="pointer-events-none relative h-[24rem] w-[24rem] z-10 rotate-[-90deg]"
        >
          <circle
            class="w-full h-full translate-x-[3rem] translate-y-[3rem] transition duration-1000 absolute"
            style="fill: none; stroke-linecap: round; stroke-dasharray: 565.49; stroke-dashoffset: {565.49 -
              (565.49 * (textContent >= 85 ? 85 : textContent)) /
                100}; stroke-width: 24;"
            cx="90"
            cy="90"
            r="90"
            stroke={textContent >= 85 ? "green" : "red"}
            id="circle"
          />
        </svg>

        <svg
          style="pointer-events: none; position:absolute; height:24rem; width:24rem; z-index:10; rotate:{percentMeta}deg"
          id="testeSvg"
        >
          <circle
            class="w-full h-full translate-x-[3rem] translate-y-[3rem] transition duration-1000"
            style="fill: none; stroke-dasharray: 565.49; stroke-dashoffset: {565.49 -
              (565.49 * 1) / 100}; stroke-width: 24;"
            cx="90"
            cy="90"
            r="90"
            stroke={textContent >= 85 ? "red" : "blue"}
            id="circle1"
          />
        </svg>

        <div
          class="absolute w-[23rem] h-[23rem] rounded-[50%] shadow-circle_shadow bg-card_white"
        />
        <div
          class="absolute w-[20.5rem] h-[20.5rem] shadow-medium_circle rounded-[50%] bg_card_white"
        />
        <div
          on:mouseover={showStatus}
          on:focus={showStatus}
          on:mouseout={hideStatus}
          on:blur={hideStatus}
          class="cursor-pointer absolute w-[15.5rem] h-[15.5rem] shadow-small_circle rounded-[50%] {bgCircle} transition duration-400"
        />
        <div
          class="card__number absolute text-[3.6rem] text-black font-bold {opPerc} {pePerc} transition duration-400"
        >
          {textContent}%
        </div>
        <div
          class="card__number absolute text-[3.6rem] text-light_white_card font-bold {opStatus} {peStatus} transition duration-400"
        >
          {text}
        </div>
      </div>
      <div class="card__description flex flex-col w-full items-center">
        <h2 class="text-4xl tracking-wider mb-4 text-black font-bold uppercase">
          {machine}
        </h2>
      </div>
      <div class="text-[11pt] text-[#646363]">
        <strong class="text-[#0f0f0f]"> Turno: </strong>
        {turnoSelect}
      </div>
      <div
        class="text-[1.4rem] flex flex-col justify-start text-start items-start w-full"
      >
        {#if information.type === "Treliça"}
          <div class="flex flex-col w-full text-[#646363]">
            <div>
              <strong class="text-[#0f0f0f] text-2xl font-bold mr-2">
                6 metros:
              </strong>
              {trussSixMeters}
            </div>
            <div>
              <strong class="text-[#0f0f0f] text-2xl font-bold mr-2">
                12 metros:
              </strong>
              {trussTwelveMeters}
            </div>
          </div>
        {:else if information.type != "Puncio"}
          <div class="flex w-full text-[#646363]">
            <strong class="text-[#0f0f0f] text-2xl font-bold mr-2"
              >{typeHit}:
            </strong>
            {hits}
          </div>
        {/if}

        <div class="flex w-full text-[#646363]">
          <strong class="text-[#0f0f0f] text-2xl font-bold mr-2"
            >Temp trab:
          </strong>
          {machineIsWorking}
        </div>
        <div class="flex w-full text-[#646363]">
          <strong class="text-[#0f0f0f] text-2xl font-bold mr-2"
            >Temp Parado:
          </strong>
          {machineIsNotWorking}
        </div>
      </div>
    </div>
  </div>
{/key}
