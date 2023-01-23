<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	let mapElement;
	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');
			let map = leaflet.map('map').setView([-25.50972, -54.61111], 90);
			leaflet
				.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);
		}
	});
</script>

<div class="h-screen w-screen z-10" id="map" bind:this={mapElement} />

<style>
	@import 'leaflet/dist/leaflet.css';
</style>
