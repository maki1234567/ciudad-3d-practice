<script>
	import { SeccionStore } from '../../store';

	export let nombre, seccion;
	let click = () => {
		SeccionStore.update((value) => {
			if (value === seccion) {
				return 0;
			} else {
				return seccion;
			}
		});
	};
</script>

<button
	on:click={click}
	class="text-sm text-gray-200 w-full h-20 hover:bg-gray-900 flex flex-col items-center justify-center py-2 my-3"
>
	<slot />
	{nombre}</button
>
