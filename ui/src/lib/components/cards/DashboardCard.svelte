<script>
	export let title = "";
	export let value = 0;
</script>


<div class="card">
	<div class="titulo">
		{title.toUpperCase()}
	</div>
	<div class="value">
		{value}
	</div>
</div>



<style>
	.card {
		height: 220px;
		width: 20%;
		min-width: 350px;
		margin: 10px;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
		background-color: #fff;
		box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
	}
	.titulo {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		font-weight: bold;
	}

	.value {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 90px;
	}
</style>