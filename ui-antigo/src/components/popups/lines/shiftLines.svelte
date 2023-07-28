<script>
    export let turno
    export let inicioTurno
    export let fimTurno

    import SimpleInput from "../../inputs/simpleInput.svelte";
</script>   

<div class="popupLine gap-[1rem] flex justify-between items-center p-[2rem] border-solid border-b-2 border-light_grey_lines">
    <div class="turnoTxt text-3xl font-semibold text-dark_green whitespace-nowrap">
        Turno {turno}
    </div>
    <SimpleInput inputW={"w-[7rem]"} inputType="text" inputPh="HH:MM" bind:inputNumber={inicioTurno} inputText="Início"></SimpleInput>
    <SimpleInput inputW={"w-[7rem]"} inputType="text" inputPh="HH:MM" bind:inputNumber={fimTurno} inputText="Fim"></SimpleInput>
</div>