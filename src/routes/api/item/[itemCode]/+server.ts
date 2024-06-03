import { Items } from '$lib/items';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const itemCode = params.itemCode;
	const item = Items.find((item) => item.itemCode === itemCode);

	if (!item) {
		return new Response(null, { status: 404 });
	}

	return new Response(JSON.stringify(item));
};
