import type { CartItem } from '$lib/types';
import { persisted } from 'svelte-persisted-store';

export const cart = persisted<CartItem[]>('cart', []);
