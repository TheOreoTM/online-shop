<script lang="ts">
	import { ShopDescription, ShopName } from '$lib/constants';
	import { MetaTags, type AdditionalRobotsProps } from 'svelte-meta-tags';

	export let title: string;
	export let pageName = ShopName;
	export let disableTemplate = true;
	export let description = ShopDescription;
	export let logo = 'https://oreotm.xyz/images/discord-pfp.png';
	export let url = 'https://oreotm.xyz/';
	export let blockRobots = false;

	const robotsProps: AdditionalRobotsProps = blockRobots
		? {}
		: {
				noarchive: true,
				nosnippet: true,
				notranslate: true,
				noimageindex: true,
				maxSnippet: -1,
				maxImagePreview: 'none',
				maxVideoPreview: -1
			};
</script>

<MetaTags
	title={pageName ? `${title} | ${pageName}` : title}
	titleTemplate={disableTemplate ? undefined : `%s | ${ShopName}`}
	{description}
	canonical={url}
	openGraph={{
		type: 'website',
		url,
		title,
		description,
		images: [{ url: logo, alt: 'icon' }],
		siteName: 'theoreotm'
	}}
	twitter={{
		cardType: 'summary',
		title,
		description,
		image: logo,
		imageAlt: 'icon'
	}}
	robots={blockRobots ? 'noindex,nofollow' : undefined}
	additionalRobotsProps={blockRobots ? undefined : robotsProps}
/>

<svelte:head>
	<meta name="theme-color" data-react-helmet="true" content="#0c0c0c" />
</svelte:head>
