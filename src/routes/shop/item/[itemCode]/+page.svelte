<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const item = data.item;
</script>

<div
	class="flex flex-col md:flex-row md:space-x-6 md:items-center min-h-96 p-6 bg-white shadow-md rounded-xl"
>
	<div class="md:w-1/2 flex justify-center items-center">
		<img src={item.image} alt="{item.itemName}-preview" class="w-64 h-64 object-cover rounded-lg" />
	</div>
	<div class="flex flex-col md:w-1/2 p-6 space-y-4">
		<header>
			<h1 class="text-2xl title-font font-bold text-black uppercase">{item.itemName}</h1>
		</header>
		<section>
			<p class="text-gray-500 text-lg mb-2">{item.itemDsc}</p>
			<div class="py-2">
				<span class="badge variant-filled-surface uppercase">{item.category}</span>
			</div>
			<div class="py-2">
				{#if parseInt(item.minqty) > parseInt(item.itemQty) && parseInt(item.itemQty) > 0}
					<span class="inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded-full"
						>Low Stock</span
					>
				{:else if parseInt(item.itemQty) <= 0}
					<span class="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full"
						>Out of Stock</span
					>
				{:else}
					<span class="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full"
						>In Stock</span
					>
				{/if}
			</div>
			<div class="text-xl font-bold">
				{#if item.discount}
					<span class="text-red-500">
						MVR {(
							parseInt(item.itemPrice) -
							(parseInt(item.itemPrice) * item.discount) / 100
						).toFixed(2)}
					</span>
					<span class="text-gray-500 line-through ml-2">MVR {item.itemPrice}</span>
				{:else}
					<span class="text-green-500">MVR {item.itemPrice}</span>
				{/if}
			</div>
			<div class="pt-4">
				<span class="text-gray-700 text-sm">Quantity Available: {item.itemQty}</span>
			</div>
		</section>
	</div>
</div>

<div class="bg-surface-500 p-6 mt-6 rounded-xl flex justify-center space-x-4">
	<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
		Share via Viber
	</button>
	<button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
		Pay Online
	</button>
</div>

<style>
	.title-font {
		font-family: 'Montserrat', sans-serif;
	}
</style>
