<script>
	import { CapaStore } from '../../store';

	let cambiar = (indice) => {
		CapaStore.update((value) => {
			if (value[indice].mostrar === false) {
				value[indice].mostrar = true;
				return value;
			} else {
				if (value[indice].mostrar === true) {
					value[indice].mostrar = false;
					return value;
				}
			}
		});
	};
</script>

<div class=" text-gray-200">
	<label for="capa1" class="m-5  " id="cosa1">
		<span class="text-red-700 text-2xl align-middle	">•</span> PlazaCity</label
	>
	<input id="capa1" class="mt-5" type="checkbox" on:change={() => cambiar(0)} /><br />

	<label for="capa1" class="m-5 " id="cosa1">
		<span class="text-red-700 text-2xl align-middle	">•</span> Asfalto</label
	>
	<input id="capa1" class="mt-5" type="checkbox" on:change={() => cambiar(1)} /><br />

	<label for="capa1" class="m-5 " id="cosa1">
		<span class="text-red-700 text-2xl align-middle	">•</span> Empedrado</label
	>
	<input id="capa1" class="mt-5" type="checkbox" on:change={() => cambiar(2)} /><br />

	<label for="capa1" class="m-5 " id="cosa1">
		<span class="text-red-700 text-2xl align-middle	">•</span> Iglesia</label
	>
	<input id="capa1" class="mt-5" type="checkbox" on:change={() => cambiar(3)} /><br />
</div>

<style>
	#cosa1 {
		font-family: sans-serif;
	}
</style>
