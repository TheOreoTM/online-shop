<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
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

<div class="relative inline-block z-[1000]">
	<Dialog.Root>
		<Dialog.Trigger
			><button
				class="fixed bottom-4 right-4 w-16 h-16 bg-blue-500 rounded-full flex justify-center items-center cursor-pointer z-10"
			>
				<i class="fa-solid fa-cart-shopping text-lg"></i>
				<span class="badge-icon variant-filled absolute -top-0 -right-0 z-50">
					{#key totalItemsInCart}
						<p in:fly={counterFlyOptions}>{totalItemsInCart}</p>
					{/key}
				</span>
			</button></Dialog.Trigger
		>
		<Dialog.Content class="bg-surface-800 rounded-md">
			<Dialog.Header>
				<Dialog.Title>Your Bag - MVR {total.toFixed(2)}</Dialog.Title>
				<Dialog.Description>
					<div class="max-h-96 overflow-auto">
						<div
							class="grid grid-cols-3 items-center gap-4 font-semibold border-b-2 border-dashed pb-3 mb-3"
						>
							<div class="text-center">Item</div>
							<div class="text-left">Quantity</div>
							<div class="text-left">Price</div>
						</div>
						{#each $cart as item (item.id)}
							<div
								animate:flip={{ delay: 200, duration: 600, easing: expoInOut }}
								transition:fly={{
									delay: 100,
									duration: 600,
									x: 500,
									opacity: 0.1,
									easing: expoInOut
								}}
								class="grid grid-cols-3 items-center gap-4 mb-4"
							>
								<div class="grid place-items-center lg:flex lg:place-content-center">
									<div class="text-sm whitespace-break-spaces ml-2 capitalize">
										<p>{item.name}</p>
									</div>
								</div>

								<input
									bind:value={item.quantity}
									min="0"
									max="99"
									class="input w-16"
									type="number"
								/>
								<div class="flex items-center">
									<span style="">MVR {item.quantity * item.price}</span>
									<div class="hidden sm:block ml-auto">
										<button
											on:click={() => discardItem(item)}
											class="text-xl fa-solid fa-trash-can text-red-500 hover:text-red-600 active:text-red-800"
										>
										</button>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
</div>
