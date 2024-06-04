<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import * as Drawer from '$lib/components/ui/drawer';
	import type { CartItem } from '$lib/types';

	$: totalItemsInCart = $cart.map((item) => item.quantity).reduce((a, b) => a + b, 0);
	$: total = $cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

	function discardItem(item: CartItem) {
		cart.update((items) => items.filter((i) => i.id !== item.id));
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
</script>

<div class="relative inline-block z-40">
	<Drawer.Root>
		<Drawer.Trigger>
			<button
				class="fixed bottom-4 right-4 w-16 h-16 bg-blue-500 rounded-full flex justify-center items-center cursor-pointer z-10"
			>
				<i class="fa-solid fa-cart-shopping text-lg"></i>
				<span class="badge-icon variant-filled absolute -top-0 -right-0 z-50">
					{totalItemsInCart}
				</span>
			</button>
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>Your Shopping Cart</Drawer.Title>
			</Drawer.Header>
			<div class="max-h-64 overflow-auto p-4">
				<Drawer.Description>
					{#each $cart as item (item.id)}
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
								<p>Price: MVR {item.price}</p>
							</div>
							<div>
								<p>MVR {(item.price * item.quantity).toFixed(2)}</p>
							</div>
						</div>
						<hr class="border-gray-700 my-4" />
					{/each}
					<div class="flex justify-between items-center">
						<h2 class="font-bold">Total</h2>
						<p>MVR {total.toFixed(2)}</p>
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
