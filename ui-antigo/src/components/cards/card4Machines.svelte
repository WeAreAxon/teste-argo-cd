<script>
  export let contentText;
  export let contentValue;
  export let contentPorcent;
  export let action = "imagemStatus";
</script>

<div class={action}>
  <span class="content">
    {contentText}
  </span>
  <span class="contents">
    <i class="fas fa-sort-up" />
    {contentValue}
  </span>
  <span class="porcent">
    {contentPorcent}
  </span>
</div>

<style>
  .disable {
    height: 100%;
    width: 100%;
    border-radius: 5px;
    transition: 0.3s;
    box-shadow: 1px 1px 5px #00000060;
    background-color: #c6c6c6;
  }

  .imagemStatus {
    height: 100%;
    width: 100%;
    border-radius: 5px;
    background-color: #ffffff;
    transition: 0.3s;
    box-shadow: 1px 1px 10px #00000060;
  }

  .content {
    font-family: "Gotham", sans-serif;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding-top: 5px;
  }

  .contents {
    text-align: center;
    font-family: "Montserrat", sans-serif;
    font-size: 350%;
    font-weight: bolder;
  }
  .porcent {
    font-size: 80%;
    color: #e73536;
    font-weight: 900;
  }

  .contents i {
    margin-left: 20%;
    font-size: 30px;
    color: #09ae87;
  }
</style>
