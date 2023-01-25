import { writable } from 'svelte/store';
export const SeccionStore = writable(0);

export const CapaStore = writable([
	{
		nombre: 'PlazaCity',
		mostrar: false
	},
	{
		nombre: 'ruta',
		mostrar: false
	},
	{
		nombre: 'iglesia',
		mostrar: false
	}
]);
