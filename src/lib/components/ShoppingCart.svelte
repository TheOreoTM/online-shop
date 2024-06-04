<script>
	import { cart } from '$lib/stores/cart';
	import * as Drawer from '$lib/components/ui/drawer';

	let totalItemsInCart = $cart.map((item) => item.quantity).reduce((a, b) => a + b, 0);
	let total = $cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
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
								<h3 class="font-semibold">{item.name}</h3>
								<p>Quantity: {item.quantity}</p>
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
			<Drawer.Footer>
				<Drawer.Close class="btn variant-filled">Cancel</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
</div>
