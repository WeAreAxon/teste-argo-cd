<script>
  export let req = false;
  export let inputText;
  export let type;
  // export let disEye = "hidden"

  export let inputValue;

  function typeAction(node) {
    node.type = type;
  }

  export let inputFunction = () => {
    console.log("No function set");
  };
</script>

<div class="inputBox relative w-full mb-[35px]">
  <input
    bind:value={inputValue}
    autocomplete="off"
    class="relative w-full pt-[10px] pb-[10px] bg-transparent outline-none text-white tracking-wide z-10 border-solid border-b-[1px] border-white"
    use:typeAction
    required={req}
    on:input={inputFunction}
  />

  <span
    class="absolute text-white left-0 pt-[17px] pb-[10px] tracking-wide pointer-events-none transition duration-500"
    >{inputText}</span
  >
</div>

<style>
  .inputBox input:valid ~ span,
  .inputBox input:focus ~ span {
    color: #038c6b;
    transform: translateY(-34px);
    font-size: 0.75em;
  }
  .inputBox input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-transition-delay: 9999s;
    transition-delay: 9999s;
  }
</style>
