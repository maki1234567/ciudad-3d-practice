<script>
	import { check_outros } from 'svelte/internal';
	import { CapaStore } from '../../store';
	let layersValue;
	CapaStore.subscribe((value) => {
		layersValue = value;
	});
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
	function Check(e) {
		let id = parseInt(e.srcElement.id);
		let isChecked = e.srcElement.checked;
		CapaStore.update((value) => {
			value[id].mostrar = isChecked;
			return value;
		});
	}
</script>

<div class=" text-gray-200">
	<label for="capa1" class="m-5  " id="cosa1">
		<span class="text-red-700 text-2xl align-middle	">•</span> PlazaCity</label
	>
	<input
		id="capa1"
		class="mt-5"
		type="checkbox"
		on:change={() => cambiar(0)}
		checked={layersValue[0].mostrar}
		on:click={(e) => {
			Check(e);
		}}
	/><br />

	<label for="capa1" class="m-5 " id="cosa1">
		<span class="text-red-700 text-2xl align-middle	">•</span> Asfalto</label
	>
	<input
		id="capa1"
		class="mt-5"
		type="checkbox"
		on:change={() => cambiar(1)}
		checked={layersValue[1].mostrar}
		on:click={(e) => {
			Check(e);
		}}
	/><br />

	<label for="capa1" class="m-5 " id="cosa1">
		<span class="text-red-700 text-2xl align-middle	">•</span> Empedrado</label
	>
	<input
		id="capa1"
		class="mt-5"
		type="checkbox"
		on:change={() => cambiar(2)}
		checked={layersValue[2].mostrar}
		on:click={(e) => {
			Check(e);
		}}
	/><br />

	<label for="capa1" class="m-5 " id="cosa1">
		<span class="text-red-700 text-2xl align-middle	">•</span> Iglesia</label
	>
	<input
		id="capa1"
		class="mt-5"
		type="checkbox"
		on:change={() => cambiar(3)}
		checked={layersValue[3].mostrar}
		on:click={(e) => {
			Check(e);
		}}
	/><br />
</div>

<style>
	#cosa1 {
		font-family: sans-serif;
	}
</style>
