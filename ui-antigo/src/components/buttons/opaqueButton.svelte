<script>
    import { text } from "svelte/internal";


    export let buttText;
   
    export let buttFunction = () => {
        console.log("No function set");
    };
</script>

<button
    on:click={buttFunction}
    data-machine={buttText}
    class="flex rounded text-3xl font-semibold justify-center text-center items-center bg-dark_green text-white px-[2rem] py-[.5rem] transition duration-300"
>
    {buttText}
</button>

<style>
    /* MUDANÇAAA */
    button {
        margin: 10px 0px;
    }
    button:hover {
        background-color: #06be93;
        transition: 300ms;
    }
</style>
