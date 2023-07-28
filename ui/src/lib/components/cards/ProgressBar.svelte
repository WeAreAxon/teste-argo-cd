<script>
	export let value = 0;
</script>

<div class="progressBar">
	<div class="progressValue"
	style="width: {value}%;
	background-color: #09AE87;"/>
	<p>{value}%</p>
</div>


<style>
	.progressBar {
		height: 30px;
		width: 100%;
		background-color: #D9D9D9;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		position: relative;
		border-radius: 15px;
		border: 4px solid #D9D9D9;
	}
	.progressValue {
		height: 100%;
		width: 70%;
		border-radius: 15px;
	}
	.progressBar p {
		font-size: 20px;
		font-weight: bold;
		position: absolute;
		top: calc(50% - 15px);
		right: 5px;
		margin: 0;
		padding: 0;
	}
</style>