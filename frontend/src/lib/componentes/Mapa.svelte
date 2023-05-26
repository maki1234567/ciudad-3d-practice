<script>
	import mapboxgl from 'mapbox-gl';
	import { onMount } from 'svelte';

	mapboxgl.accessToken =
		'pk.eyJ1IjoibWsxMjM0NTY3IiwiYSI6ImNsZGVzaXpmbTBnazkzcW5yc3dydWFvbGgifQ.newNjWFN35d3MwooA6wZ0w';

	onMount(() => {
		const map = new mapboxgl.Map({
			style: 'mapbox://styles/mapbox/light-v11',
			center: [-54.678388888889, -25.497527777778],
			zoom: 16,
			pitch: 45,
			bearing: -17.6,
			container: 'map',
			antialias: true
		});
		map.addControl(new mapboxgl.FullscreenControl());

		map.on('style.load', () => {
			const layerList = document.getElementById('menu');
			const inputs = layerList.getElementsByTagName('input');

			for (const input of inputs) {
				input.onclick = (layer) => {
					const layerId = layer.target.id;
					map.setStyle('mapbox://styles/mapbox/' + layerId);
				};
			}

			// Insert the layer beneath any symbol layer.
			const layers = map.getStyle().layers;
			const labelLayerId = layers.find(
				(layer) => layer.type === 'symbol' && layer.layout['text-field']
			).id;

			mapa3d(map, labelLayerId);
			capa1(map);

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

			let click = true;
			let cp1 = document.getElementById('cp1');

			cp1.addEventListener('click', () => {
				if (click) {
					map.removeLayer('add-cap1');
					cp1.value = 'cap1';
					click = false;
				} else {
					cp1.value = 'cap';
					capa1(map);
					click = true;
				}
			});
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
						'fill-extrusion-color': '#B01732',
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
						'fill-extrusion-opacity': 0.8
					}
				},
				labelLayerId
			);
		}

		function capa1(map) {
			map.addSource({
				id: 'add-cap1',
				type: 'fill',
				source: {
					type: 'geojson',
					data: {
						type: 'FeatureCollection',
						features: [
							{
								type: 'Feature',
								properties: {
									stroke: '#8cff00',
									'stroke-width': 5,
									'stroke-opacity': 4,
									fill: '#0e1d90',
									'fill-opacity': 1
								},
								geometry: {
									type: 'Polygon',
									coordinates: [
										[
											[-54.68845496882682, -25.496248446570547],
											[-54.68863913143474, -25.497860943625568],
											[-54.681680425975856, -25.498346282861093],
											[-54.682771522985504, -25.5100210694398],
											[-54.678418138766745, -25.51060099436978],
											[-54.677464509575856, -25.49671055218562],
											[-54.68845496882682, -25.496248446570547]
										]
									]
								},
								id: 'add-cap1'
							}
						]
					}
				},
				paint: {
					'fill-color': ['get', 'fill'],
					'fill-opacity': ['get', 'fill-opacity'],
					'fill-outline-color': ['get', 'stroke'],
					'fill-outline-width': ['get', 'stroke-width']
				}
			});
		}
	});
</script>

<svelte:head>
	<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.12.1/mapbox-gl.css" rel="stylesheet" />

	<link href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css" rel="stylesheet" />
	<script src="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js"></script>
</svelte:head>

<div id="map" class=" w-screen h-screen z-10" />
<div id="menu" class=" absolute  ">
	<input
		id="satellite-streets-v12"
		type="button"
		name="rtoggle"
		value="satellite"
		checked="checked"
	/>
	<label
		for="satellite-streets-v12"
		class="map_buttons  absolute  z-20 text-gray-200 bg-gray-800  hover:bg-slate-900 py-1 px-1  rounded-sm border-t mx-64"
		>Satelite</label
	>
	<input id="light-v11" type="button" name="rtoggle" value="light" />
	<label
		for="light-v11"
		class="map_buttons  absolute  z-20 text-gray-200 bg-gray-800  hover:bg-slate-900 py-1 px-1  rounded-sm border-t mx-10 "
		>light</label
	>
	<input id="dark-v11" type="button" name="rtoggle" value="dark" />
	<label
		for="dark-v11"
		class="map_buttons  absolute  z-20 text-gray-200 bg-gray-800  hover:bg-slate-900 py-1 px-1  rounded-sm border-t mx-14 "
		>dark</label
	>

	<input id="outdoors-v12" type="button" name="rtoggle" value="outdoors" />
	<label
		for="outdoors-v12"
		class="map_buttons  absolute  z-20 text-gray-200 bg-gray-800  hover:bg-slate-900 py-1 px-1  rounded-sm border-t mx-10"
		>outdoors</label
	>
</div>
<button />
<div>
	<input
		type="button"
		id="b_3d"
		value="3D"
		class="map_buttons  absolute  z-20 text-gray-200 bg-gray-800  hover:bg-slate-900 py-1 px-1  rounded-sm border-t"
	/>
</div>
<div>
	<input
		type="button"
		id="cp1"
		value="cap1"
		class="map_buttons  absolute  z-30 text-gray-200 bg-gray-800  hover:bg-slate-900 py-1 px-1  rounded-sm border-t"
	/>
</div>

<style>
	#b_3d {
		left: 120px;
		bottom: 55px;
		font-weight: 400;
	}
	#menu {
		top: 5px;
	}
	#cp1 {
		left: 160px;
		bottom: 55px;
		font-weight: 400;
	}
</style>
