<script>
  export let diaIni = undefined;
  export let diaFim = undefined;
</script>

<div class="turnos flex">
  <div class="labelFilter">
    <label class="ml-1" for="dataIni">Data de início</label>
    <input
      class="outline-0 border-[1px] border-solid border-[#D4D4D4] rounded-[5px] w-[10rem] h-[3rem] p-[5px] mr-5 ml-1"
      type="date"
      name="dataIni"
      aria-describedby="help"
      max={diaFim}
      bind:value={diaIni}
    />
  </div>
  <div class="labelFilter">
    <label class="ml-1" for="dataFim">Data final</label>
    <input
      class="outline-0 border-[1px] border-solid border-[#D4D4D4] rounded-[5px] w-[10rem]  p-[5px] mr-5 ml-1 h-[3rem]"
      type="date"
      name="dataFim"
      aria-describedby="help"
      min={diaIni}
      bind:value={diaFim}
    />
  </div>
</div>

<style>
  .labelFilter {
    /* font-size: 12px; */
    display: flex;
    flex-direction: column;
  }
</style>
