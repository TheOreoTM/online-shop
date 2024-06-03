import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Item } from '$lib/types';

export const load = (async ({ params, fetch }) => {
	const itemCode = params.itemCode;

	const item = await fetch(`/api/item/${itemCode}`)
		.then((res) => res.json())
		.catch(() => null);

	if (!item) {
		throw error(404, 'Item not found');
	}

	return {
		item: {
			...item,
			image: `https://www.ihurufihaara.com/store/assets/img/${item.itemCode}.png`
		} as Item & { image: string }
	};
}) satisfies PageServerLoad;
