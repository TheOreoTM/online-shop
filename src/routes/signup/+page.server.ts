import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_BASE_WEB_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { OAuth2Client } from 'google-auth-library';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	OAuth2: async ({}) => {
		const redirectUrl = PUBLIC_BASE_WEB_URL + '/oauth';

		const oAuth2Client = new OAuth2Client({
			clientSecret: GOOGLE_CLIENT_SECRET,
			clientId: GOOGLE_CLIENT_ID,
			redirectUri: redirectUrl
		});

		const authorizeUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
			prompt: 'consent'
		});

		throw redirect(302, authorizeUrl);
	}
};
