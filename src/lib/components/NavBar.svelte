<script lang="ts">
	import type { User } from 'lucia';
	import UserDropdown from './UserDropdown.svelte';
	import { page } from '$app/stores';
	import { NavLinks } from '$lib/constants';
	import HamburgerMenu from './HamburgerMenu.svelte';

	$: classesBase = `flex flex-col bg-surface-500 rounded-full space-y-4 p-3 px-6 ${$$props.class ?? ''}`;
	$: classesRowMain = `grid items-center grid-cols-[auto_1fr_auto] gap-4 `;
	$: classesRowHeadline = ``;
	$: classesSlotLead = `flex-none flex justify-between items-center `;
	$: classesSlotDefault = `flex-auto `;
	$: classesSlotTrail = `flex-none flex items-center space-x-4`;

	const hamburgerMenu = () => {
		console.log('hamburgerMenu');
	};

	const navLinks = [
		{ path: '/shop', label: 'Shop', isNew: true },
		{ path: '/', label: 'Home' },
		{ path: '/telegram', label: 'Telegram' },
		{ path: '/viber', label: 'Viber' },
		{ path: '/call', label: 'Call' }
	];

	export const isActivePath = (path: string) => {
		if (path === '/shop' && $page.url.pathname.startsWith('/shop')) {
			return true;
		}

		return $page.url.pathname === path;
	};
</script>

<div class="app-bar w-full {classesBase}" data-testid="app-bar" role="toolbar">
	<!-- Row: Main -->
	<div class="app-bar-row-main bg-transparent {classesRowMain}">
		<!-- Slot: lead -->
		{#if $$slots.lead}
			<div class="app-bar-slot-lead {classesSlotLead}"><slot name="lead" /></div>
		{/if}
		<!-- Slot: default -->
		<div class="app-bar-slot-default {classesSlotDefault}"><slot /></div>
		<!-- Slot: trail -->
		{#if $$slots.trail}
			<!-- Big -->
			<div class="app-bar-slot-trail hidden md:flex {classesSlotTrail}">
				<nav class="flex space-x-8 font-semibold items-center">
					{#each NavLinks as { label, path, isNew } (path)}
						<a class={`${isActivePath(path) ? 'text-base' : 'opacity-60'}`} href={path}
							>{label}
							{#if isNew}
								<span class="badge variant-soft-warning">New</span>
							{/if}
						</a>
					{/each}
					<slot name="trail" />
				</nav>
			</div>
			<!-- Mobile -->
			<div class="app-bar-slot-trail md:hidden {classesSlotTrail}">
				<slot name="trail-mobile" />
			</div>
		{/if}
	</div>
	<!-- Row: Headline -->
	{#if $$slots.headline}
		<div class="app-bar-row-headline {classesRowHeadline}"><slot name="headline" /></div>
	{/if}
</div>
