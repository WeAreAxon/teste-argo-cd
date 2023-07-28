<script>
  export let textConfirm;
  export let refBtnConfirm;

  export let funcConfirm = () => {
    console.log("Sem função");
  };

  export let selected = "";
</script>

{#key selected}
  <a href={refBtnConfirm}>
    <button class={selected} type="button" on:click={funcConfirm}
      >{textConfirm}</button
    >
  </a>
{/key}

<style>
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-weight: normal;
    font-size: 14px;
    width: 13vw;
    height: 5vh;
    border: none;
    border-radius: 5px;
    margin: 0px 0px 0px 14px;
    margin-right: 20px;
    margin-top: 4%;
    margin-bottom: 5%;
  }

  button {
    color: #111;
    box-shadow: 1px 1px 10px #00000050;
    background-color: #ffffff;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
    box-shadow: 1px 1px 20px #00000020;
  }

  button {
    font-family: "Gotham", sans-serif;
    font-weight: 400;
  }

  button:hover {
    background-color: #d9d9d97a;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  }

  .selected {
    background-color: #d9d9d97a;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  }

  a {
    text-decoration: none;
  }
  @media screen and (max-width: 400px) {
    button {
      font-size: 18px;
      width: 100%;
      height: 7vh;
      gap: 1%;
      margin-left: 0%;
    }

    a {
      text-decoration: none;
      width: 80%;
    }
  }
</style>
