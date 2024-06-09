import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_BASE_WEB_URL } from '$env/static/public';
import { OAuth2Client } from 'google-auth-library';
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const redirectUrl = PUBLIC_BASE_WEB_URL + '/oauth';
	const code = url.searchParams.get('code');

	try {
		if (!code) {
			throw new Error('No code provided');
		}

		const oAuth2Client = new OAuth2Client({
			clientSecret: GOOGLE_CLIENT_SECRET,
			clientId: GOOGLE_CLIENT_ID,
			redirectUri: redirectUrl
		});

		const r = await oAuth2Client.getToken(code);
		oAuth2Client.setCredentials(r.tokens);
		console.log('Authenticated', r.tokens);
		const user = oAuth2Client.credentials;
		console.log('User', user);
	} catch (error) {
		console.error('Error', error);
	}

	throw redirect(303, '/');
};
