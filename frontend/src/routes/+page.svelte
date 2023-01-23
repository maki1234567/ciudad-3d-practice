<script>
	import Mapa from '$lib/componentes/Mapa.svelte';
	import BarraLateral from '$lib/componentes/BarraLateral.svelte';
	import Secciones from '../lib/componentes/Secciones.svelte';
	import { SeccionStore } from '../store';
	let show;

	SeccionStore.subscribe((value) => {
		show = value;
	});
</script>

<div class="flex">
	<BarraLateral />
	{#if show}
		<Secciones />
	{/if}
	<Mapa />
</div>
