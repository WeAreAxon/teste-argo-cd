<script>
	export let page = "";
</script>

<div class="navigationArea">
	<div class="backArea">
		<a href="/">
			<i class="fa-solid fa-chevron-left"></i>
			Voltar
		</a>
	</div>
	<div class="breadcrumbArea">
		<a href="/">
			Página inicial
		</a>
		<i class="fa-solid fa-chevron-right"></i>
		{page}
	</div>
</div>


<style>
	.navigationArea {
		height: fit-content;
		width: fit-content;
		position: absolute;
		top: -45px;
		left: 0;
		font-weight: lighter;
		z-index: 99999999999999999999999999;
	}
	
	
	.backArea {
		height: fit-content;
		width: fit-content;
	}
	.backArea a {
		color: black;
		font-size: 18px;
		text-decoration: none;
	}

	.breadcrumbArea {
		height: fit-content;
		width: fit-content;
		font-size: 12px;
		color: #909090;
	}
	
	.breadcrumbArea a {
		color: #909090;
		text-decoration: none;
	}

	@media screen and (max-width: 650px) {
		.breadcrumbArea {
			display: none;
		}
}
</style>