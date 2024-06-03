import type { Item } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const res = await fetch('/api/items');
	const itemsData = (await res.json()) as Item[];
	const items = itemsData.map((item) => {
		return {
			...item,
			image: `https://www.ihurufihaara.com/store/assets/img/${item.itemCode}.png`
		};
	});

	return {
		items
	};
}) satisfies PageServerLoad;
