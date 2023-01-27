<script>
	import { browser, dev } from '$app/environment';
	import { onMount, afterUpdate } from 'svelte';
	import { assets } from '$app/paths';
	import { CapaStore } from '../../store';

	let OSMbuildings;
	let mapElement;
	let GrupoCapas;
	let capNombre;
	let leaflet;
	let osmlayer;
	let map;
	CapaStore.subscribe((value) => {
		capNombre = value;
	});

	let capas = [];

	onMount(async () => {
		if (browser) {
			leaflet = await import('leaflet');
			OSMbuildings = await import('osmbuildings/dist/OSMBuildings-Leaflet.debug');
			map = leaflet.map('map').setView([-25.497527777778, -54.678388888889], 90);
			leaflet
				.tileLayer(
					'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWsxMjM0NTY3IiwiYSI6ImNsZGVzaXpmbTBnazkzcW5yc3dydWFvbGgifQ.newNjWFN35d3MwooA6wZ0w',
					{
						attribution:
							'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
						id: 'mapbox.satellite',
						accessToken:
							'pk.eyJ1IjoibWsxMjM0NTY3IiwiYSI6ImNsZGVzaXpmbTBnazkzcW5yc3dydWFvbGgifQ.newNjWFN35d3MwooA6wZ0w'
					}
				)

				.addTo(map);
			if (dev) {
				osmlayer = new OSMbuildings.OSMBuildings(map).load();
			} else {
				osmlayer = new OSMbuildings(map).load();
			}
			GrupoCapas = new leaflet.LayerGroup();
			GrupoCapas.addTo(map);
			GrupoCapas.addLayer(osmlayer);
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
			if (elemento.mostrar) {
				if (capas[indice]) {
					if (!GrupoCapas.hasLayer(capas[indice])) {
						GrupoCapas.addLayer(capas[indice]);
					}
				} else {
					fetch(`${assets}/capas/${elemento.nombre}.geojson`)
						.then((response) => response.json())
						.then((data) => {
							capas[indice] = new leaflet.GeoJSON(data);
							GrupoCapas.addLayer(capas[indice]);
						});
				}
			} else {
				if (capas[indice] && GrupoCapas.hasLayer(capas[indice])) {
					GrupoCapas.removeLayer(capas[indice]);
				}
			}
		});
	});
</script>

<button
	class="absolute  z-20 text-gray-200 bg-gray-800  hover:bg-slate-900 py-1 px-1  rounded-sm border-t "
	on:click={() => {
		if (map.hasLayer(osmlayer)) {
			map.removeLayer(osmlayer);
		} else {
			map.addLayer(osmlayer);
		}
	}}
>
	3D</button
>

<div class="h-screen w-screen z-10" id="map" bind:this={mapElement} data-algo={capNombre} />

<style>
	@import 'leaflet/dist/leaflet.css';
	button {
		left: 120px;
		bottom: 20px;
		font-weight: 400;
	}
</style>
