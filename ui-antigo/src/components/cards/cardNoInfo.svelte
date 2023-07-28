<script>
    // export let text = "";
    // export let progressEndValue;

    let dark_red = "#220000";
    let light_red = "#EE5355";
    let dark_yellow = "#221f00";
    let light_yellow = "#FDE53B";
    let dark_green = "#00221a";
    let light_green = "#01ddaa";

    let opStatus = "opacity-0";
    let peStatus = "pointer-events-none";

    let opPerc = "opacity-100";
    let pePerc = "pointer-events-none";

    let bgCircle = "bg-card_white";

    let textContent = "Sem Informações";

    // const showStatus = () => {
    //     opPerc = "opacity-0";
    //     opStatus = "opacity-100";

    //     bgCircle =
    //         text === "ON" ? "bg-green_warn_circle" : "bg-red_warn_circle";
    // };

    const hideStatus = () => {
        opStatus = "opacity-0";
        opPerc = "opacity-100";

        bgCircle = "bg-card_white";
    };

    $: style = `<style> html { font-size: 62.5%; } </style>`;
</script>

{@html style}
<div
    class="container h-[59.8rem] flex justify-center items-center w-full md_cards:w-[40%] xl:w-[30%]"
>
    <div
        class="card w-[34rem] flex flex-col justify-center items-center rounded-[2rem] bg-light_white_card shadow-card_shadow p-[5rem]"
    >
        <div
            class="card__percent relative flex justify-center items-center mb-[5rem] "
        >
            <div
                class="absolute w-[23rem] h-[23rem] rounded-[50%] shadow-circle_shadow bg-card_white opacity-[0]"
            />
            <div
                class="absolute w-[20.5rem] h-[20.5rem] shadow-medium_circle rounded-[50%] bg_card_white opacity-[0]"
            />
            <!-- <div
                on:mouseover={showStatus}
                on:focus={showStatus}
                on:mouseout={hideStatus}
                on:blur={hideStatus}
                class="cursor-pointer absolute w-[15.5rem] h-[15.5rem] shadow-small_circle rounded-[50%] {bgCircle} transition duration-400 opacity-[0]"
            /> -->
            <!-- <div
                class="card__number absolute text-[3.6rem] text-light_white_card font-bold {opStatus} {peStatus} transition duration-400"
            >
                {text}
            </div> -->
        </div>
        <div class="card__description absolute text-[3.6rem] text-black font-bold transition duration-400">
            {textContent}
        </div>
    </div>
</div>
