<script>

    export let stats;
    export let textButton;
    export let tailwindClass;
    export let classIcon;

    export let setFunction = () =>{
        console.log("No function set")
    }
</script>

<button
        type="button"
        class="btn {tailwindClass} {stats}"
        on:click={setFunction}
        ><i class="{classIcon}" 
        />{textButton}</button
        
>

<style>
.btn {
        transition: background 450ms ease-in-out;
        padding: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 14px;
    }
    .icon {
        padding-right: 5px;
    }
</style>