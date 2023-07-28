<script>
  import Router from "svelte-spa-router";

  //Rotas
  import Card from "./routes/machines/machines.svelte";
  import Login from "./routes/auth/login.svelte";
  import MainChart from "./routes/machines/chartGeral.svelte";
  import Layout2 from "./routes/machines/layout2.svelte";
  import Layout3 from "./routes/machines/layout3.svelte";

 

</script>

<Router
  routes={{
    "/": Login,
    "/card": Card,
    "/charts/geral": MainChart,
    "/charts/2": Layout2,
    "/charts/3": Layout3,
  }}
/>

<style>
</style>
