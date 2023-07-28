<script>
    export let buttText
    

    export let buttFunction = () => {
        console.log('No function set')
    }
</script>

<button on:click={buttFunction} class="flex rounded text-3xl font-semibold justify-center text-center items-center bg-transparent text-dark_green px-[1rem] py-[.1rem] border-solid border-2 border-dark_green transition duration-300">
    {buttText}
</button>

<style>
    button:hover {
        border: 2px solid #06be93;
        color: #06be93;
        transition: 300ms;
    }
</style>