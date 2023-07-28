<script>
	import Navbar from '$lib/components/navigation/Navbar.svelte';
	import './styles.css';

	const user = 'MATHEUS MACHADO';
	const email = 'teste@gmail.com.br';
	const photo = '';
</script>

<div class="app">
	<Navbar {user} {email} {photo}/>
	<main>
		<slot/>
	</main>

</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
		background-color: #F8F9FA;
	}
	
	main {
		flex: 1;
		overflow: auto;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
