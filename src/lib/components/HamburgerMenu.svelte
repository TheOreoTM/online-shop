<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { NavLinks } from '$lib/constants';
	import type { User } from '@prisma/client';

	export let user: User | null;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} class="btn-icon">
			<i class="fa-solid fa-burger text-xl"></i>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label>
			<span>Navigation</span>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			{#each NavLinks as { label, path } (path)}
				<a href={path}>
					<DropdownMenu.Item class="hover:cursor-pointer">{label}</DropdownMenu.Item>
				</a>
			{/each}
		</DropdownMenu.Group>
		{#if user}
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<a href="/user">
					<DropdownMenu.Item class="hover:cursor-pointer">Profile</DropdownMenu.Item></a
				>
				<a href="/user/history">
					<DropdownMenu.Item class="hover:cursor-pointer">History</DropdownMenu.Item></a
				>
				<a href="/user/favourites">
					<DropdownMenu.Item class="hover:cursor-pointer">Favourites</DropdownMenu.Item>
				</a>
			</DropdownMenu.Group>
		{/if}
		<DropdownMenu.Separator />
		{#if user}
			<a href="/logout">
				<DropdownMenu.Item class="hover:cursor-pointer">Log out</DropdownMenu.Item>
			</a>
		{:else}
			<a href="/login/google">
				<DropdownMenu.Item class="hover:cursor-pointer">Login with Google</DropdownMenu.Item>
			</a>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
