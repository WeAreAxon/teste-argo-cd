<script>
	//
	//
	//
</script>

<div class="miniCard">
	<div class="areaValue">
		<div class="titulo">Produtividade</div>
		<div class="valorPrincipal">32</div>
		<div class="valorHistorico">1,2%</div>
	</div>
	<div class="areaDoughnut">
		<div class="doughnutExterno" style="background: 
		conic-gradient(
     	   red 0deg 180deg,
     	   #D9D9D9 0deg 360deg
    	);;">
			<div class="doughnutInterno">
				70%
			</div>
		</div>
	</div>
</div>



<style>

	.miniCard {
		height: 190px;
		width: calc(50% - 20px);
		display: flex;
		flex-direction: row;
		margin: 10px;
		padding: 10px;
		border-radius: 10px;
		box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
		background-color: #fff;
	}

	.areaValue {
		height: 100%;
		width: 60%;
		/* background-color: rgb(204, 171, 63); */
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
	}

	.titulo {
		font-size: 25px;
	}
	.valorPrincipal {
		font-size: 50px;
		font-weight: bold;
	}
	.valorHistorico {
		font-size: 20px;
		font-weight: bold;
		/* margin-bottom: 20px; */
	}
	
	.areaDoughnut {
		height: 100%;
		width: 40%;
		/* background-color: rgb(36, 201, 132); */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.doughnutExterno {
    	border-radius: 100%;
    	width: 110px;
    	height: 110px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* box-shadow: 
        0px 4px 15px #9b9b9b, 
        inset 0px 0px 12px #9b9b9b; */
	}

	.doughnutInterno {
		height: 80px;
		width: 80px;
		border-radius: 50%;
		background-color: #fff;
		/* box-shadow: 0px 4px 25px #9b9b9b; */
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 30px;
	}

	@media screen and (max-width: 910px) {
		.miniCard {
			min-width: 340px;
		}
	}
</style>