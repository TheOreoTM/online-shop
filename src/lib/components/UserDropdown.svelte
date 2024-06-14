<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import type { User } from '@prisma/client';

	export let user: User;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} class="btn variant-ghost-primary rounded-full">
			<span>{user.name}</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label>{user.name}</DropdownMenu.Label>
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
		<DropdownMenu.Separator />
		<a href="/logout">
			<DropdownMenu.Item class="hover:cursor-pointer">Log out</DropdownMenu.Item>
		</a>
	</DropdownMenu.Content>
</DropdownMenu.Root>
