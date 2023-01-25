<script>
	import { browser } from '$app/environment';
	import { onMount, afterUpdate } from 'svelte';
	import { assets } from '$app/paths';
	import { CapaStore } from '../../store';

	let mapElement;
	let GrupoCapas;
	let CapaPlaza;
	let CapaRuta;
	let capNombre;
	let leaflet;
	CapaStore.subscribe((value) => {
		capNombre = value;
	});

	let capas = [];

	onMount(async () => {
		if (browser) {
			leaflet = await import('leaflet');
			let map = leaflet.map('map').setView([-25.497527777778, -54.678388888889], 90);
			leaflet
				.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			GrupoCapas = new leaflet.LayerGroup();
			GrupoCapas.addTo(map);
			capNombre.map((elemento, indice) => {
				if (elemento.mostrar === true) {
					fetch(`${assets}/capas/${elemento.nombre}.geojson`)
						.then((response) => response.json())
						.then((data) => {
							GrupoCapas.addLayer(new leaflet.GeoJSON(data));
						});
				}
			});
		}
	});
	afterUpdate(() => {
		capNombre.map((elemento, indice) => {
			if (elemento.mostrar === true) {
				fetch(`${assets}/capas/${elemento.nombre}.geojson`)
					.then((response) => response.json())
					.then((data) => {
						capas[indice] = new leaflet.GeoJSON(data, {
							color: 'red'
						});
						GrupoCapas.addLayer(capas[indice]);
					});
			} else {
				if (capas[indice]) {
					GrupoCapas.removeLayer(capas[indice]);
				}
			}
		});
	});
</script>

<div class="h-screen w-screen z-10" id="map" bind:this={mapElement} data-algo={capNombre} />

<style>
	@import 'leaflet/dist/leaflet.css';
</style>
