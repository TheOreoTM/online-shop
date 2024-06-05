<script lang="ts">
	import { addItemToCart } from '$lib/functions/cart';
	import { loading } from '$lib/stores/loading';
	import type { Item } from '$lib/types';
	import type { PageData } from './$types';
	import { cart } from '$lib/stores/cart';
	import { toast } from 'svelte-sonner';

	export let data: PageData;

	const items = data.items;

	async function addItem(item: Item) {
		const targetItem = $cart.find((i) => i.id === item.itemCode);
		const first = !targetItem;

		try {
			loading.set(true);
			await addItemToCart(item.itemCode);
			successToast(item.itemName, first);
		} catch (error) {
			const err = error as Error;
			if (err.message === 'MaxQtyReached') {
				outOfStock(item.itemName);
				return;
			}
			errorToast();
			return;
		} finally {
			loading.set(false);
		}
	}

	function successToast(itemName: string, first = false) {
		toast.success(`${itemName.toUpperCase()} ${first ? 'added' : '+1'}`, {});
	}

	function errorToast() {
		toast.error(`There was an unexpected error`);
	}

	function outOfStock(itemName: string) {
		toast.warning(`${itemName.toUpperCase()} is out of stock`);
	}
</script>

<div class="logo-cloud grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
	{#each items as item (item.itemCode)}
		<a
			href={`/shop/item/${item.itemCode}`}
			class="card bg-initial overflow-hidden group flex flex-col justify-between"
			data-sveltekit-preload-data="hover"
		>
			<header class="relative bg-white">
				{#if parseInt(item.minqty) > parseInt(item.itemQty) && parseInt(item.itemQty) > 0}
					<p class="badge absolute bottom-0 rounded-l-none left-0 z-10 bg-gray-500">Low Stock</p>
				{:else if parseInt(item.itemQty) <= 0}
					<p class="badge absolute bottom-0 rounded-l-none left-0 z-10 bg-red-500">Out of Stock</p>
				{/if}
				{#if item.discount}
					<p class="badge absolute top-0 w-full rounded-none left-0 z-10 bg-red-500">
						-{item.discount}% Discount
					</p>
				{/if}
				<div class="w-full aspect-square overflow-hidden">
					<img
						src={item.image}
						class="object-cover scale-75 w-full h-full transition-transform duration-200 transform group-hover:scale-90"
						alt="{item.itemName}-preview"
					/>
				</div>
			</header>
			<div class="p-4 space-y-2 flex-grow z-10">
				<div class="flex flex-row justify-between">
					<p class="opacity-40">{item.itemDsc}</p>
					<button
						on:click={async (event) => {
							event.preventDefault();
							event.stopPropagation();
							addItem(item);
						}}
						disabled={$loading || parseInt(item.itemQty) <= 0}
						type="button"
						class="btn-icon btn-icon-sm {parseInt(item.itemQty) <= 0
							? 'bg-red-500'
							: 'variant-filled-success'}"
					>
						<span>
							{#if $loading}
								<i class="fa-solid fa-spinner spin"></i>
							{:else if parseInt(item.itemQty) <= 0}
								<i class="fa-solid fa-cart-arrow-down"></i>
							{:else}
								<i class="fa-solid fa-cart-plus"></i>
							{/if}
						</span>
					</button>
				</div>
				<h3 class="h3 uppercase" data-toc-ignore>{item.itemName}</h3>
			</div>
			<article class="p-4 pt-2 mt-auto flex justify-start">
				{#if item.discount}
					<p class="badge bg-red-500">
						MVR {(
							parseInt(item.itemPrice) -
							(parseInt(item.itemPrice) * item.discount) / 100
						).toFixed(2)}
					</p>
					<p class="badge variant-filled-success opacity-40 ml-2">
						<del>MVR {item.itemPrice}</del>
					</p>
				{:else}
					<p class="badge variant-filled-success">
						MVR {item.itemPrice}
					</p>
				{/if}
			</article>
		</a>
	{/each}
</div>

<style>
	.spin {
		animation: spin 1s linear infinite;
	}
</style>
