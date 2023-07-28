<script lang="ts">
	import logo from "../../../../static/assets/connect.png";
	import userCircle from "../../../../static/assets/userCircle.svg";

	export let user = '';
	export let email = '';
	export let photo = '';

	let showMenu = false;
	function handleMenu(status: boolean) {
		showMenu = status;
	}
</script>


<div id="navbarAxon">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<i class="fa-solid fa-bars" id="menuBtn" on:click={() => handleMenu(true)}/>
	<a href="/app"><img src='{logo}' alt="Axon" id="logoAxon"></a>
	<div class="areaUser">
		<img src='{photo ? photo : userCircle}' alt="imagem do usuario" id="userImage">
		<div class="areaUserInfo">
			<div id="username">{user.toUpperCase()}</div>
			<div id="email">{email}</div>
		</div>
		<i class="fa-solid fa-right-from-bracket" id="exitIcon"/>
	</div>
</div>

{#key showMenu}
	{#if showMenu && window.innerWidth <= 600}
		<div class="fundoMenu">
			<div class="menu">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<i class="fa-solid fa-times" id="fecharMenu" on:click={() => handleMenu(false)}/>
				<a href="/app"><img src='{logo}' alt="Axon" id="logoAxon"></a>
				<div class="areaUserMenu">
					<img src='{photo ? photo : userCircle}' alt="imagem do usuario" id="userImage">
					<div class="areaUserInfo">
						<div id="username">{user.toUpperCase()}</div>
						<div id="email">{email}</div>
					</div>
					<i class="fa-solid fa-right-from-bracket" id="exitIcon"/>
				</div>
			</div>
		</div>
	{/if}
{/key}

<style>
	#navbarAxon {
		max-width: 100%;
		height: 80px;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.25);
		z-index: 9999999;
		padding: 0px 15px;
	}
	
	i:hover {
		cursor: pointer;
	}

	#menuBtn {
		display: none;
	}

	#logoAxon {
		height: 30px;
		margin-top: 5px;
	}

	.areaUser {
		height: 100%;
		width: fit-content;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}


	#exitIcon {
		font-size: 35px;
	}

	#userImage {
		height: 66%;
	}

	.areaUserInfo {
		height: 100%;
		width: fit-content;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		margin: 0px 40px 0px 10px;
	}

	#username {
		font-weight: bold;
		font-size: 18px;
	}

	#email {
		font-size: 14px;
	}

	.fundoMenu {
		display: none;
	}

	@media screen and (max-width: 600px) {
		#navbarAxon {
			position: relative;
			justify-content: center;
		}

		#menuBtn {
			display: flex;
			position: absolute;
			font-size: 40px;
			left: 15px;
			top: calc(50% - 20px);
		}

		.areaUser {
			display: none;
		}

		.fundoMenu {
			position: fixed;
			left: 0;
			top: 0;
			height: 100%;
			width: 100%;
			background-color: #11111191;
			z-index: 999999999;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-start;
		}

		.menu {
			height: calc(100% - 0px);
			width: 85%;
			background-color: #FFFFFF;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			padding: 20px 0px;
		}

		#fecharMenu {
			font-size: 40px;
			position: absolute;
			top: 5px;
			right: 10px;
		}

		.areaUserMenu {
			height: 80px;
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}
}

</style>