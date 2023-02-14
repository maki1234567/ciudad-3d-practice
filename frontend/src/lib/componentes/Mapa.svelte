<script>
	import mapboxGl from 'mapbox-gl';
	import mapboxgl from 'mapbox-gl';
	import { onMount } from 'svelte';
	mapboxgl.accessToken =
		'pk.eyJ1IjoibWsxMjM0NTY3IiwiYSI6ImNsZGVzaXpmbTBnazkzcW5yc3dydWFvbGgifQ.newNjWFN35d3MwooA6wZ0w';
	onMount(() => {
		const map = new mapboxgl.Map({
			style: 'mapbox://styles/mapbox/dark-v11',
			center: [-54.61028514552068, -25.509389375238143],
			zoom: 16,
			pitch: 45,
			bearing: -17.6,
			container: 'map',
			antialias: true
		});
		map.on('style.load', () => {
			// Insert the layer beneath any symbol layer.
			const layers = map.getStyle().layers;
			const labelLayerId = layers.find(
				(layer) => layer.type === 'symbol' && layer.layout['text-field']
			).id;
			mapa3d(map, labelLayerId);

			// The 'building' layer in the Mapbox Streets
			// vector tileset contains building height data
			// from OpenStreetMap.
			let clicked = true;

			let b_3d = document.getElementById('b_3d');
			b_3d.addEventListener('click', () => {
				if (clicked) {
					map.removeLayer('add-3d-buildings');
					b_3d.value = '3D';
					clicked = false;
				} else {
					b_3d.value = '2D';
					mapa3d(map, labelLayerId);
					clicked = true;
				}
			});

			function mapa3d(map, labelLayerId) {
				map.addLayer(
					{
						id: 'add-3d-buildings',
						source: 'composite',
						'source-layer': 'building',
						filter: ['==', 'extrude', 'true'],
						type: 'fill-extrusion',
						minzoom: 15,
						paint: {
							'fill-extrusion-color': '#aaa',

							// Use an 'interpolate' expression to
							// add a smooth transition effect to
							// the buildings as the user zooms in.
							'fill-extrusion-height': [
								'interpolate',
								['linear'],
								['zoom'],
								15,
								0,
								15.05,
								['get', 'height']
							],
							'fill-extrusion-base': [
								'interpolate',
								['linear'],
								['zoom'],
								15,
								0,
								15.05,
								['get', 'min_height']
							],
							'fill-extrusion-opacity': 0.6
						}
					},
					labelLayerId
				);
			}
		});

		map.addControl(new mapboxgl.FullscreenControl());
	});
	function cambiarMapa() {
		document.getElementById('b_style').addEventListener('click', () => {
			if (map.hasLayer().sprite === 'mapbox://sprites/mapbox/dark-v11') {
				map.removeLayer('mapbox://sprites/mapbox/dark-v11');
				map.addLayer('mapbox://styles/mapbox/satellite-streets-v12');
			} else {
				map.removeLayer('mapbox://styles/mapbox/satellite-streets-v12');

				map.addLayer('mapbox://styles/mapbox/dark-v11');
			}
		});
	}
</script>

<svelte:head>
	<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css" rel="stylesheet" />
	<script src="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.js"></script>
</svelte:head>

<div id="map" class="h-screen w-screen z-10" />
<button />
<div>
	<input
		type="button"
		id="b_3d"
		value="3D"
		class="map_buttons  absolute  z-20 text-gray-200 bg-gray-800  hover:bg-slate-900 py-1 px-1  rounded-sm border-t"
		on:click={b_3d}
	/>
	<input
		type="button"
		id="b_style"
		value="Satelite"
		class="map_buttons  absolute  z-20 text-gray-200 bg-gray-800  hover:bg-slate-900 py-1 px-1  rounded-sm border-t "
		on:click={cambiarMapa}
	/>
</div>

<style>
	#b_3d {
		left: 120px;
		bottom: 55px;
		font-weight: 400;
	}
	#b_style {
		left: 160px;
		bottom: 55px;
		font-weight: 400;
	}
</style>
