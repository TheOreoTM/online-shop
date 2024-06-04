import type { Item } from '$lib/types';

export async function getItemByCode(code: string): Promise<Item> {
	const res = await fetch(`/api/item/${code}`);
	if (res.ok) {
		return res.json();
	} else {
		throw new Error(res.statusText);
	}
}

export async function getItems({ offset = 0, limit = 10, search = '' }): Promise<Item[]> {
	const res = await fetch(`/api/item?search=${search}&limit=${limit}&offset=${offset}`);
	if (res.ok) {
		return res.json();
	} else {
		throw new Error(res.statusText);
	}
}
