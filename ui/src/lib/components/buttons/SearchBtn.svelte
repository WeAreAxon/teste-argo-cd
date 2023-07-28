<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let value = '';

    function eventType() {
        dispatch("message", { text: value });
    }
</script>

<form class="d-flex" autocomplete="off">
    <input class="form-control me-2" type="search" placeholder="Pesquisar..." aria-label="Search" bind:value on:input={eventType}/>
    <i class="fas fa-search"/>
</form>

<style>
    form {
        display: flex;
        flex-direction: row;
        align-items: center;
        max-width: 250px;
        min-width: 250px;
    }
    i {
        font-size: 25px;
    }
</style>
