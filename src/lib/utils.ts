import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

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

export function getItemImage(code: string): string {
	return `https://www.ihurufihaara.com/store/assets/img/${code}.png`;
}

import { typeid } from 'typeid-js';
import type { TypeID } from 'typeid-js';

export function generatePrefixedId<T extends string>(prefix: T): TypeID<T> {
	const typeidLength = 26;

	// I don't allow IDs to be longer than 36 characters in my columns.
	// Change to your liking or implement it per id.
	const maxLenPrefix = 36 - typeidLength - 1;

	if (prefix.length > maxLenPrefix) {
		throw new Error(`Prefix too long. Max length is ${maxLenPrefix}.`);
	}

	return typeid(prefix);
}

/**
 * https://www.ietf.org/archive/id/draft-peabody-dispatch-new-uuid-format-04.html#name-uuid-version-7
 */
export function uuidv7(): string {
	return typeid().toString();
}

// This could be moved to the User model?
export function generateUserId(): TypeID<'user'> {
	return generatePrefixedId<'user'>('user');
}

import { OAuthRequestError } from '@lucia-auth/oauth';

// Taken from Lucia.
// Need it to make manual requests to some providers.
export async function handleRequest<T>(request: Request) {
	request.headers.set('User-Agent', 'lucia');
	request.headers.set('Accept', 'application/json');

	const response = await fetch(request);

	if (!response.ok) {
		throw new OAuthRequestError(request, response);
	}

	return (await response.json()) as T;
}

export function doesRouteRequireAuthorisation(routeId: string): boolean {
	return routeId.startsWith('/(protected)');
}
