<script>
  import FilterButton from "../buttons/filterButton.svelte";


  export let filterOn = "filterOff";
  export let mostraFiltro = () => {
    filterOn = filterOn == "filterOff" ? "filterOn" : "filterOff";
    return filterOn;
  };
  export let clearFiltro = () => {
    console.log("Sem função ainda!");
  };
</script>

<div class="filter flex">
  <FilterButton
    stats={filterOn}
    setFunction={mostraFiltro}
    textButton="Filtros"
    tailwindClass="btn-light mr-3 shacow-sm bg-[#2563EB] text-white p-[4px] rounded-[4px] m-[6px] hover:bg-[#1D4ED8] w-fit] h-[3.5rem]"
    classIcon="fas fa-sliders-h text-white icon"
  />
  <FilterButton
    stats={filterOn}
    setFunction={clearFiltro}
    textButton=""
    tailwindClass="btn btn-light mr-5 shacow-sm bg-[#9F1239] text-white p-[4px] rounded-[4px] m-[6px] hover:bg-[#E11D48] w-fit h-[3.5rem]"
    classIcon="fas fa-trash-alt text-white"
  />
  <!-- <button
        type="button"
        class="btn btn-light mr-3 shacow-sm bg-[#2563EB] text-white p-[4px] rounded-[4px] m-[6px] hover:bg-[#1D4ED8] w-fit] h-[3.5rem] {filterOn}"
        on:click={mostraFiltro}
        ><i class="fas fa-sliders-h text-white icon" /> Filtros</button
    >
    <button
        type="button"
        class="btn btn-light mr-10 shacow-sm bg-[#9F1239] text-white p-[4px] rounded-[4px] m-[6px] hover:bg-[#E11D48] w-fit h-[3.5rem] {filterOn}"
        on:click={clearFiltro}
        ><i class="fas fa-trash-alt text-white" /></button
    > -->
</div>

<style>
</style>
