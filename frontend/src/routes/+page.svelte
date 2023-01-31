<script>
	import Mapa from '$lib/componentes/Mapa.svelte';
	import BarraLateral from '$lib/componentes/BarraLateral.svelte';
	import Secciones from '../lib/componentes/Secciones.svelte';
	import { SeccionStore } from '../store';
	import { ClickOut } from '../ClickOut';

	let show;

	SeccionStore.subscribe((value) => {
		show = value;
	});
	const out = () => {
		show = !show;
	};
</script>

<div class="flex">
	<BarraLateral />
	{#if show}
		<div use:ClickOut on:click_outside={out}><Secciones /></div>
	{/if}
	<Mapa />
</div>
