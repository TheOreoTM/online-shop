import type { RequestHandler } from './$types';
import { Items } from '$lib/items';

export const GET: RequestHandler = async ({ url }) => {
	const { searchParams } = new URL(url);
	const search = searchParams.get('search');
	const limit = parseInt(`${searchParams.get('limit')}`) || 50;

	let filteredItems = Items;

	if (search) {
		filteredItems = Items.filter((item) =>
			item.itemName.toLowerCase().includes(search.toLowerCase())
		);
	}

	const itemsToDisplay = filteredItems.slice(0, limit);
	return new Response(JSON.stringify(itemsToDisplay));
};
