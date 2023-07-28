<script>
	export let maquinaLigada = false;
	let status = maquinaLigada ? "ON" : "OFF";
	let backgroundColor = maquinaLigada ? "#00FF66" : "#FF0000";
</script>

<div class="statusBadge" style="background-color: {backgroundColor};">{status}</div>

<style>
	.statusBadge {
		height: 40px;
		width: 110px;
		border-radius: 7px;
		color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 10px 0px;
		font-weight: bold;
		font-size: 25px;
	}
</style>
