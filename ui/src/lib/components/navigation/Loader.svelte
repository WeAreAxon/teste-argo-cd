<script>
	import logo from "../../../../static/assets/axonLoaderBlackpng.gif";
	export let maquina = "Indefinido"
</script>


<div class="background">
	<img src="{logo}" alt="">
	{maquina}
</div>



<style>
	.background {
		height: 100%;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		border-radius: 20px;
		font-size: 30px;
		font-weight: lighter;
		/* flex-wrap: wrap; */
		word-wrap: break-word;
		padding: 10px;
	}


	img {
		height: 50%;
	}
</style>