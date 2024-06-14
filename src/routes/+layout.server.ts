import { db } from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const user =
		db.user.findUnique({
			where: {
				id: locals.session?.userId || ''
			}
		}) ?? null;

	return { url: url.pathname, session: locals.session, streamed: { user } };
};
