<script>
	export let stats;
	export let tailwindClass;
</script>

<button type="button" class="btn {tailwindClass} {stats}">
	<img src="./static/downloading.gif" alt="downloading" />
</button>

<style>

	.btn {
		transition: background 450ms ease-in-out;
		padding: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		width: 2.5rem;
	}
	.icon {
		padding-right: 5px;
	}
</style>
