<script>
	import SeccionInfo from './SeccionInfo.svelte';
	import SeccionCapas from './SeccionCapas.svelte';
	import SeccionNorma from './SeccionNorma.svelte';
	import { SeccionStore } from '../../store';

	let seccion;
	SeccionStore.subscribe((value) => {
		seccion = value;
	});
</script>

<div class="h-screen w-96  bg-gray-700 absolute z-30 left-20">
	{#if seccion === 1}
		<SeccionInfo />
	{:else if seccion === 2}
		<SeccionCapas />
	{:else if seccion === 3}
		<SeccionNorma />
	{/if}
</div>
