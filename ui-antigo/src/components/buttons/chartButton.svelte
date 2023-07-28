<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let text;
  export let aux;

  export let chartButton = () => {
    dispatch("dateParam", {
      month: text,
      machine: localStorage.getItem("machine") || false,
    });

    localStorage.setItem("month", text);
  };
</script>

<button
  id="todos"
  class="btn boxDados validacao {aux === text ? 'selecionado' : ''}"
  on:click={chartButton}
  value={text}
>
  {text}
</button>

<style>
  .boxDados {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-weight: normal;
    font-size: 16px;
    width: 84px;
    height: 60px;
    border-radius: 10px;
  }
  .boxDados {
    color: #111;
    background-color: #e9e9e940;
    box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.1),
      -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
    cursor: pointer;
    font-family: "Montserrat", sans-serif;
  }
  .boxDados:hover {
    background-color: #f1f1f1;
    box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.1) inset,
      -6px -6px 10px -1px rgba(255, 255, 255, 0.7) inset;
  }

  .selecionado {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-size: 16px;
    width: 84px;
    height: 60px;
    font-weight: normal;
    border-radius: 10px;
  }
  .selecionado {
    color: #111;
    background-color: #f1f1f1;
    box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.1) inset,
      -6px -6px 10px -1px rgba(255, 255, 255, 0.7) inset;
    cursor: pointer;
    font-weight: bolder;
  }
</style>
