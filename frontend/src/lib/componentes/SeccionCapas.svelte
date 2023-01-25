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

<div>
	<label for="capa1" class="m-5 " id="cosa1"> PlazaCity</label>

	<input id="capa1" class="mt-5" type="checkbox" on:change={() => cambiar(0)} /><br />

	<label for="capa1" class="m-5 " id="cosa1"> Rutas</label>
	<input id="capa1" class="mt-5" type="checkbox" on:change={() => cambiar(1)} /><br />

	<label for="capa1" class="m-5 " id="cosa1"> iglesia</label>
	<input id="capa1" class="mt-5" type="checkbox" on:change={() => cambiar(2)} /><br />
</div>

<style>
	#cosa1 {
		color: gray;
		font-family: sans-serif;
	}
</style>
