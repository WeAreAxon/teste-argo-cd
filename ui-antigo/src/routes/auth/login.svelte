<script>
  import Rej from "../../components/warn/rej.svelte";
  import TxtLogin from "../../components/inputs/txtLogin.svelte";
  import MainButton from "../../components/buttons/mainButton.svelte";

  import { push } from "svelte-spa-router";

  let user;
  let password;

  let disRej = "hidden";
  let txtRej = "Rejeitado";

  const checkLogin = async () => {
    const res = await fetch(
      `${import.meta.env["VITE_BACK"]}/back/api/v1/login/check`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Controle-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: user.toLowerCase(),
          password: password,
        }),
      }
    );
    const resJson = await res.json();

    if (res.ok) {
      disRej = "hidden";
      push(resJson.route);
    } else {
      disRej = "flex";
      txtRej = resJson.msg;
    }
  };
</script>

<div
  class="conteudo h-full w-full flex flex-row items-center justify-center bg-radial_login"
>
  <div
    class="cardLogin h-[70%] w-[80%] flex flex-row justify-center items-center rounded-[10px] p-[50px]"
  >
    <div class="areaForm h-full w-[50%] flex items-center justify-evenly">
      <div class="login-box static w-[400px] p-[40px] rounded-[10px]">
        <h2
          class="mt-[0px] mx-[0px] p-0 text-white text-center font-bold text-[1.5em]"
        >
          Acesso
        </h2>
        <form class="flex flex-col">
          <TxtLogin
            inputText="Usuário"
            bind:inputValue={user}
            req={true}
            type="text"
          />
          <TxtLogin
            inputText="Senha"
            bind:inputValue={password}
            req={true}
            type="password"
          />
          <Rej text={txtRej} dis={disRej} />
          <div class="flex justify-center">
            <MainButton buttonText="ENTRAR" buttonFunction={checkLogin} />
          </div>
        </form>
      </div>
    </div>
    <div
      class="areaBtns w-[50%] h-full flex flex-col items-center justify-center"
    >
      <div
        class="areaLogo w-full h-full flex flex-col items-start justify-end p-[40px]"
      >
        <img
          class="w-[70%]"
          src="/static/logoAxonNoMargin.png"
          alt="Logo Axon"
        />
      </div>
      <div
        class="areaTextos w-full h-full flex flex-col items-start justify-start p-[40px]"
      >
        <p class="bemVindo text-xl font-bold text-white">Bem-vindo</p>
        <p class="colaborador font-extrabold text-5xl text-white">
          COLABORADOR
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  @media screen and (max-width: 960px) {
    .cardLogin {
      display: flex;
      flex-direction: column-reverse;
      padding: 50px;
      height: 80%;
    }
    .areaForm {
      height: 100%;
      width: 100%;
    }
    .areaBtns {
      height: 100%;
      width: 100%;
    }

    .areaLogo,
    .areaTextos {
      align-items: center;
    }
  }

  @media screen and (max-width: 600px) {
    .bemVindo {
      font-size: 1rem;
    }

    .colaborador {
      font-size: 2rem;
    }
  }

  @media screen and (max-width: 500px) {
    .bemVindo {
      font-size: 0.85rem;
    }

    .colaborador {
      font-size: 1.75rem;
    }

    .login-box h2 {
      margin-bottom: 20%;
    }
  }
</style>
