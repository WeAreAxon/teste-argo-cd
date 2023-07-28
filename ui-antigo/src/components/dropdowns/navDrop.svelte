<script>
  export let arrayInsideValues;
  export let initialValue

  let op = "opacity-0"
  let pe = "pointer-events-none"
</script>

<div class="relative inline-block text-left">
  <div class="flex justify-center text-center items-center">
    <button
      type="button"
      class="buttonDrop text-3xl inline-flex w-full justify-center rounded-md border border-none bg-trasnparent font-medium text-white outline-none focus:outline-none transition duration-300"
      id="menu-button"
      on:click={() => {
        op = op === "opacity-0" ? "opacity-100" : "opacity-0"
        pe = pe === "pointer-events-none" ? "pointer-events-auto" : "pointer-events-none"
      }}
    >
    <strong>{initialValue}</strong>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
      </svg>
    </button>
  </div>
  <div
    class="absolute right-0 z-[1000] mt-2 w-64 origin-top-right rounded-md bg-card_white shadow-xl border-none outline-none {op} {pe} focus:outline-none transition duration-500"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="menu-button"
    tabindex="-1"
  >
    <div class="py-1" role="none">
      {#each arrayInsideValues as value}
        <div
          class="block px-4 py-2 text-3xl"
          role="menuitem"
          tabindex="-1"
          id="menu-item-0"
        >
          {value.text}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
    .buttonDrop:hover {
        color: rgb(146, 146, 146);
        transition: 300ms;
    }
                                                /* esconde o checkbox */
   
</style>
