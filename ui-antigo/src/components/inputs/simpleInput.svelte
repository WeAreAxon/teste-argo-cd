<script>
  export let inputText;
  export let inputPh;
  export let inputType;
  export let inputW = "w-full";
  export let inputNumber

  function typeAction(node) {
    node.type = inputType;
  }

  export let onChangeFunc = () => {
    console.log(inputNumber)
};
</script>

<div class="inputDiv flex gap-[1.5rem] items-center">
  <div class="inputHeader text-3xl font-semibold">
    {inputText}
  </div>
  <input
    use:typeAction
    class="simpleInput flex justify-center text-3xl items-center outline-none border-solid border-light_grey_lines border-b-2 bg-transparent {inputW} focus:outline-none"
    placeholder={inputPh}
    on:change={onChangeFunc}
    bind:value={inputNumber}
  />
</div>

<style>
  .simpleInput::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
</style>
