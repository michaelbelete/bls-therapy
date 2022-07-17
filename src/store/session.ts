import { writable } from 'svelte-local-storage-store'

export const sessionStore = writable('session', null);
