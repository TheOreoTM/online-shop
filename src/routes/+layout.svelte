<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';

	// Font Awesome
	import '@fortawesome/fontawesome-free/css/fontawesome.css';
	import '@fortawesome/fontawesome-free/css/brands.css';
	import '@fortawesome/fontawesome-free/css/solid.css';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import NavBar from '$lib/components/NavBar.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { Toaster } from '$lib/components/ui/sonner';

	import { initializeStores, Toast } from '@skeletonlabs/skeleton';

	initializeStores();

	const navLinks = [
		{ path: '/shop', label: 'Shop', isNew: true },
		{ path: '/', label: 'Home' },
		{ path: '/telegram', label: 'Telegram' },
		{ path: '/viber', label: 'Viber' },
		{ path: '/call', label: 'Call' }
	];

	import PageTransition from '$lib/components/PageTransition.svelte';
	import { page } from '$app/stores';
	import { ShopName } from '$lib/constants';
	import ShoppingCart from '$lib/components/ShoppingCart.svelte';
	import ShoppingBag from '$lib/components/ShoppingBag.svelte';

	$: isActivePath = (path: string) => {
		if (path === '/shop' && $page.url.pathname.startsWith('/shop')) {
			return true;
		}

		return $page.url.pathname === path;
	};

	export let data;
</script>

<ShoppingBag />
<Toaster position="top-center" richColors />
<!-- App Shell -->
<AppShell
	slotPageHeader="mx-auto container p-4 bg-transparent"
	slotPageContent="container mx-auto px-4 pb-10"
>
	<svelte:fragment slot="pageHeader">
		<!-- App Bar -->
		<NavBar regionRowHeadline="rounded-full" regionRowMain="rounded-full">
			<svelte:fragment slot="lead">
				<strong class="text-lg">{ShopName}</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<nav class="flex space-x-8 font-semibold">
					{#each navLinks as { label, path, isNew } (path)}
						<a class={`${isActivePath(path) ? 'text-base' : 'opacity-60'}`} href={path}
							>{label}
							{#if isNew}
								<span class="badge variant-soft-warning">New</span>
							{/if}
						</a>
					{/each}
				</nav>
			</svelte:fragment>
		</NavBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<PageTransition url={data.url}>
		<slot />
	</PageTransition>
</AppShell>
