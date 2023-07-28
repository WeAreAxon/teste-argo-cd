<script>
  export let Dashboard;
</script>

<div class="container">
  <div class="left">
    <h1>{Dashboard}</h1>
  </div>

  <div class="right">
    <button>Layout</button>
  </div>
</div>

<style>
  .container {
    width: 100%;
    height: 7vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    margin-top: 3%;
  }

  .left {
    width: 50%;
    height: fit-content;
    padding-left: 3%;
  }

  .left h1 {
    font-size: 25px;
    font-family: "Montserrat", sans-serif;
    font-weight: 900;
  }

  .right {
    width: 50%;
    height: fit-content;
    padding-left: 34%;
  }

  button {
    background-color: #00b2ff;
    width: 200px;
    height: 6vh;
    font-family: "Montserrat", sans-serif;
    font-size: 18px;
    color: white;
    border-radius: 5px;
  }
</style>
