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
	class="text-xs text-gray-500 w-full h-20 hover:bg-gray-100 flex flex-col items-center justify-center py-2 my-3"
>
	<slot />
	{nombre}</button
>
