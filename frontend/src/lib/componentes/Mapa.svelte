<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { assets } from '$app/paths';
	import { CapaStore } from '../../store';

	let mapElement;
	let GrupoCapas;
	let CapaPlaza;
	let CapaRuta;

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');
			let map = leaflet.map('map').setView([-25.497527777778, -54.678388888889], 90);
			leaflet
				.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			GrupoCapas = new leaflet.LayerGroup();
			GrupoCapas.addTo(map);
			fetch(`${assets}/capas/PlazaCity.geojson`)
				.then((response) => response.json())
				.then((data) => {
					CapaPlaza = new leaflet.GeoJSON(data);

					GrupoCapas.addLayer(CapaPlaza);
				});
			fetch(`${assets}/capas/ruta.geojson`)
				.then((response) => response.json())
				.then((data) => {
					CapaRuta = new leaflet.GeoJSON(data);

					GrupoCapas.addLayer(CapaRuta);
				});
		}
	});
</script>

<div>
	<button
		on:click={() => {
			GrupoCapas.removeLayer(CapaPlaza);
		}}
		class="text-xs text-gray-500 w-full h-20 hover:bg-gray-100 flex flex-col items-center justify-center py-2 my-3"
		on:dblclick={() => {
			GrupoCapas.addLayer(CapaPlaza);
		}}
		>Quitar capa de Plaza
	</button>
</div>
<div>
	<button
		on:click={() => {
			GrupoCapas.removeLayer(CapaRuta);
		}}
		class="text-xs text-gray-500 w-full h-20 hover:bg-gray-100 flex flex-col items-center justify-center py-2 my-3"
		on:dblclick={() => {
			GrupoCapas.addLayer(CapaRuta);
		}}
		>Quitar capa de Ruta
	</button>
</div>

<div class="h-screen w-screen z-10" id="map" bind:this={mapElement} />

<style>
	@import 'leaflet/dist/leaflet.css';
</style>
