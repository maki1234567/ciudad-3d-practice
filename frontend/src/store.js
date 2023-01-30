import { writable } from 'svelte/store';
export const SeccionStore = writable(0);

export const CapaStore = writable([
	{
		nombre: 'PlazaCity',
		mostrar: false
	},
	{
		nombre: 'Asfalto',
		mostrar: false
	},

	{
		nombre: 'Empedrado',
		mostrar: false
	},
	{
		nombre: 'iglesia',
		mostrar: false
	}
]);
export const TDStore = writable(0);
