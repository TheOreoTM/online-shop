<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import * as Drawer from '$lib/components/ui/drawer';
	import type { CartItem } from '$lib/types';
	import { flip } from 'svelte/animate';
	import { fly, fade } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';
	import { getItemImage } from '$lib/utils';

	$: totalItemsInCart = $cart.map((item) => item.quantity).reduce((a, b) => a + b, 0);
	$: total = $cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
	$: drawerOpen = false;

	function discardItem(item: CartItem) {
		cart.update((items) => items.filter((i) => i.id !== item.id));

		if ($cart.length === 0) {
			drawerOpen = false;
		}
	}

	function incrementItem(item: CartItem) {
		cart.update((items) =>
			items.map((i) => {
				if (i.id === item.id) {
					i.quantity += 1;
				}
				return i;
			})
		);
	}

	function decrementItem(item: CartItem) {
		if (item.quantity - 1 === 0) {
			discardItem(item);
			return;
		}

		cart.update((items) =>
			items.map((i) => {
				if (i.id === item.id) {
					i.quantity -= 1;
				}
				return i;
			})
		);
	}

	const counterFlyOptions = { y: 10, duration: 300, easing: expoInOut };
</script>

<div class="relative inline-block z-40">
	<Drawer.Root bind:open={drawerOpen}>
		<Drawer.Trigger>
			<button
				class="fixed bottom-4 right-4 w-16 h-16 bg-blue-500 rounded-full flex justify-center items-center cursor-pointer z-10"
			>
				<i class="fa-solid fa-cart-shopping text-lg"></i>
				<span class="badge-icon variant-filled absolute -top-0 -right-0 z-50">
					{#key totalItemsInCart}
						<p in:fly={counterFlyOptions}>{totalItemsInCart}</p>
					{/key}
				</span>
			</button>
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>
					{#key total}
						<p>
							Your Bag - <span in:fade={{ duration: 600 }}>MVR {total.toFixed(2)}</span>
						</p>
					{/key}
				</Drawer.Title>
			</Drawer.Header>
			<div class="max-h-64 overflow-auto p-4">
				<Drawer.Description>
					<!-- {#each $cart as item (item.id)}
						<div
							animate:flip={{ delay: 200, duration: 600, easing: expoInOut }}
							transition:fly={{
								delay: 100,
								duration: 600,
								x: 500,
								opacity: 0.1,
								easing: expoInOut
							}}
						>
							<div class="flex justify-between items-center mb-4">
								<div class="flex-1">
									<div class="flex flex-row items-center space-x-2">
										<h3 class="font-semibold">{item.name}</h3>
										<button type="button" on:click={() => discardItem(item)}>
											<i class="fa-solid fa-trash-can text-red-500"></i>
										</button>
									</div>
									<div class="flex flex-row items-center space-x-1">
										<p class="pr-1">Quantity: {item.quantity}</p>
										<button type="button" on:click={() => incrementItem(item)}>
											<i class="fa-solid fa-plus text-green-500"></i>
										</button>
										<button type="button" on:click={() => decrementItem(item)}>
											<i class="fa-solid fa-minus text-red-500"></i>
										</button>
									</div>
									{#key item.quantity}
										<div class="flex flex-row space-x-1">
											<p>Price: MVR</p>
											<p in:fly={counterFlyOptions}>
												{(item.price * item.quantity).toFixed(2)}
											</p>
										</div>
									{/key}
								</div>
							</div>
							<hr class="border-gray-700 my-4" />
						</div>
					{/each} -->

					<div class="p-5 shadow-xl w-screen md:w-auto">
						<div
							class="grid grid-cols-3 items-center gap-4 font-semibold border-b-2 border-dashed pb-3 mb-3"
						>
							<div class="text-center">Item</div>
							<div>Quantity</div>
							<div>Price</div>
						</div>
						{#each $cart as item (item.id)}
							<div class="grid grid-cols-3 items-center gap-4 mb-4">
								<div class="grid place-items-center lg:flex lg:place-content-center">
									<div class="text-sm whitespace-pre ml-2 capitalize">{item.name}</div>
								</div>
								<input
									bind:value={item.quantity}
									min="0"
									max="99"
									class="border rounded text-gray-500 w-16 pl-2 py-1"
									type="number"
								/>
								<div class="flex items-center">
									<span style="">MVR {item.quantity * item.price}</span>
									<button
										class="text-xl ml-auto fa-solid fa-trash-can text-red-500 hover:text-red-600 active:text-red-800"
									>
									</button>
								</div>
							</div>
						{/each}
					</div>

					<div class="flex justify-between items-center">
						<h2 class="font-bold">Total</h2>
						{#key total}
							<p in:fly={counterFlyOptions}>MVR {total.toFixed(2)}</p>
						{/key}
					</div>
				</Drawer.Description>
			</div>
			<Drawer.Footer class="flex flex-row justify-between">
				<Drawer.Close class="btn variant-filled flex-grow">Add More Items</Drawer.Close>
				<button class="variant-ghost-primary btn" disabled={$cart.length === 0}>Checkout</button>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
</div>
