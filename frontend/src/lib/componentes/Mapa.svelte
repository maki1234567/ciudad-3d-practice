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

		const layerList = document.getElementById('menu');
		const inputs = layerList.getElementsByTagName('input');

		for (const input of inputs) {
			input.onclick = (layer) => {
				const layerId = layer.target.id;
				map.setStyle('mapbox://styles/mapbox/' + layerId);
			};
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
				map.addLayer('PlazaCity', {
					id: 'plazacity',
					type: 'geojson',
					data: 'CapaStore',
					generateId: true
				});

				map.addLayer('Empedrado', {
					type: 'geojson',
					data: 'CapaStore',
					generateId: true
				});

				map.addLayer('Asfalto', {
					type: 'geojson',
					data: 'CapaStore',
					generateId: true
				});
				map.addLayer('iglesia', {
					type: 'geojson',
					data: 'CapaStore',
					generateId: true
				});

				///////////////// checkboxes /////////////////////

				addMapLayer('iglesia', 'Iglesia', 'line', line_style('#59c2ff', 5));
				addMapLayer('plazacity', 'PlazaCity', 'line', line_style('#000000'));
				addMapLayer('empedrado', 'Empedrado', 'line', line_style('#65661a'));
				addMapLayer('asfalto', 'Asfalto', 'line', line_style('#a3a3a3'));

				let c2 = document.getElementById('plazacity');
				let added = false;

				c2.addEventListener('change', function () {
					if (this.checked) {
						map.removeLayer('add-3d-buildings');
						map.addLayer({
							id: c2.id,
							source: 'plazacity-source',
							type: 'fill-extrusion',
							paint: {
								'fill-extrusion-color': [
									'case',
									['boolean', ['feature-state', 'hover'], false],
									'#000000',
									'#9aad9f'
								],
								'fill-extrusion-height': 3,
								'fill-extrusion-opacity': 0.8
							}
						});
						added = true;
					} else {
						map.removeLayer(c2.id);
						added = false;
						mapa3d(map, labelLayerId);
					}
				});
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
		}
	});
</script>

<svelte:head>
	<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css" rel="stylesheet" />
	<script src="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.js"></script>
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
<div id="Capas">
	<div class="checkboxes">
		<input type="checkbox" id="plazacity" class="capas_checkbox" />

		<p class="capa_titulo">PlazaCity</p>
	</div>

	<div class="checkboxes">
		<input type="checkbox" id="asfalto" class="capas_checkbox" />
		<p class="capa_titulo">Asfaltado</p>
	</div>

	<div class="checkboxes">
		<input type="checkbox" id="empedrado" class="capas_checkbox" />
		<p class="capa_titulo">Empedrado</p>
	</div>

	<div class="checkboxes">
		<input type="checkbox" id="iglesia" class="capas_checkbox" />
		<p class="capa_titulo">Iglesia</p>
	</div>
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
</style>
