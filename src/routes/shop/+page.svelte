<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;

	const items = data.items;
</script>

<div class="logo-cloud grid grid-cols-2 md:grid-cols-6 gap-2">
	{#each items as item}
		<a
			href={`/shop/item/${item.itemCode}`}
			class="card bg-initial overflow-hidden"
			data-sveltekit-preload-data="hover"
		>
			<header class="relative inline-block">
				{#if item.discount}
					<p class="badge absolute bottom-0 rounded-l-none left-0 z-10 bg-red-500">
						-{item.discount}% Discount
					</p>
				{/if}
				<img
					src={item.image}
					class="bg-black/50 w-full aspect-[1/1]"
					alt="{item.itemName}-preview"
				/>
			</header>
			<div class="p-4 pb-2 space-y-2">
				<p class="opacity-40">
					{item.itemDsc}
				</p>
				<h3 class="h3" data-toc-ignore>{item.itemName}</h3>
				<article class="flex space-x-2">
					{#if item.discount}
						<p class="badge bg-red-500">
							MVR {(
								parseInt(item.itemPrice) -
								(parseInt(item.itemPrice) * item.discount) / 100
							).toFixed(2)}
						</p>
						<p class="badge variant-filled-success opacity-40">
							<del>MVR {item.itemPrice}</del>
						</p>
					{:else}
						<p class="badge variant-filled-success">
							MVR {item.itemPrice}
						</p>
					{/if}
				</article>
			</div>
			<!-- <hr class="opacity-50" />
			<footer class="p-4 flex justify-start items-center space-x-4">
				<div class="flex-auto flex justify-between items-center">
					<h6 class="font-bold" data-toc-ignore>By Alex</h6>
					<small>On {new Date().toLocaleDateString()}</small>
				</div>
			</footer> -->
		</a>
	{/each}
</div>
