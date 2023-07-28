<script>
    export let machine
    export let config
    export let selected

    $: roundColor = config ? "bg-warn_green" : "bg-warn_red"
    $: txtColor = config ? "text-warn_green" : "text-warn_red"
</script>   

<div class="popupLine flex justify-between items-center p-[2rem] border-solid border-b-2 border-light_grey_lines">
    <div class="configDiv flex justify-start text-start items-center text-3xl {txtColor} font-semibold gap-[1rem]">
        <div class="circle rounded-[50%] {roundColor} w-[1rem] h-[1rem] flex items-center justify-center text-center">
        </div>
        Config
    </div>
    <div class="machineTxt text-3xl font-semibold">
        {machine}
    </div>
    <i class="fas fa-cog text-3xl cursor-pointer" on:click={() => {selected = machine}}></i>
</div>