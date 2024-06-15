import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { custom_theme } from './src/custom_theme';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			colors: {
				border: 'hsl(240 3.7% 15.9% / <alpha-value>)',
				muted: {
					DEFAULT: 'hsl(240 3.7% 15.9% / <alpha-value>)',
					foreground: 'hsl(0 0% 100% / 0.6)'
				}
			}
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [
					{
						name: 'crimson',
						enhancements: true
					}
				],
				custom: [custom_theme]
			}
		})
	]
} satisfies Config;
