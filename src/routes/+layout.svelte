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

	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();

	import PageTransition from '$lib/components/PageTransition.svelte';
	import { ShopName } from '$lib/constants';
	import ShoppingBag from '$lib/components/ShoppingBag.svelte';
	import UserDropdown from '$lib/components/UserDropdown.svelte';
	import LoginButton from '$lib/components/LoginButton.svelte';
	import HamburgerMenu from '$lib/components/HamburgerMenu.svelte';

	export let data;
</script>

<ShoppingBag />
<Toaster position="top-center" richColors />
<!-- App Shell -->
<AppShell
	slotPageHeader="mx-auto container px-4 pb-4  bg-transparent"
	slotPageContent="container mx-auto px-4 pb-10"
>
	<svelte:fragment slot="pageHeader">
		<!-- App Bar -->
		<NavBar regionRowHeadline="rounded-full" regionRowMain="rounded-full">
			<svelte:fragment slot="lead">
				<strong class="text-lg">{ShopName}</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#await data.streamed.user}
					<LoginButton />
				{:then user}
					{#if user}
						<div class="hidden md:flex">
							<UserDropdown {user} />
						</div>
					{:else}
						<LoginButton />
					{/if}
				{/await}
			</svelte:fragment>
			<svelte:fragment slot="trail-mobile">
				{#await data.streamed.user}
					<LoginButton />
				{:then user}
					<HamburgerMenu {user} />
				{/await}
			</svelte:fragment>
		</NavBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<PageTransition url={data.url}>
		<slot />
	</PageTransition>
</AppShell>
