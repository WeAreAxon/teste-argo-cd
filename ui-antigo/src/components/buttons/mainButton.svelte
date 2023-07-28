<script>
  export let buttonText;

  let keyValue;

  export let buttonFunction = () => {
    console.log("No function set");
  };

  const keyVerify = (e) => {
    keyValue = e.key
        
    if(keyValue === "Enter"){
      buttonFunction()
    }
  }

</script>

<div
  class="button w-[150px] text-center cursor-pointer relative inline-block text-[white] py-[10px] px-[20px] text-[16px] overflow-hidden mt-[40px] tracking-[4px] transition duration-500 rounded-md"
  on:click={buttonFunction}
>
  <span />
  <span />
  <span />
  <span />
  {buttonText}
</div>
<svelte:window  on:keypress={keyVerify}/>

<style>
  .button:hover {
    background: #38b09d;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 2.5px #38b09d, 0 0 12.5px #38b09d, 0 0 25px #38b09d,
      0 0 1px #38b09d;
  }

  .button span {
    background-color: #038c6b;
    position: absolute;
    display: block;
  }

  .button span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #38b09d);
    animation: btn-anim1 2s linear infinite;
  }

  @keyframes btn-anim1 {
    0% {
      left: -100%;
    }
    50%,
    100% {
      left: 100%;
    }
  }

  .button span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #38b09d);
    animation: btn-anim2 2s linear infinite;
    animation-delay: 0.5s;
  }

  @keyframes btn-anim2 {
    0% {
      top: -100%;
    }
    50%,
    100% {
      top: 100%;
    }
  }

  .button span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #38b09d);
    animation: btn-anim3 2s linear infinite;
    animation-delay: 1s;
  }
  @keyframes btn-anim3 {
    0% {
      right: -100%;
    }
    50%,
    100% {
      right: 100%;
    }
  }

  .button span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #38b09d);
    animation: btn-anim4 2s linear infinite;
    animation-delay: 1.5s;
  }
  @keyframes btn-anim4 {
    0% {
      bottom: -100%;
    }
    50%,
    100% {
      bottom: 100%;
    }
  }
</style>
