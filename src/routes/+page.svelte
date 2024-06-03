<script>
	import Card from '$lib/components/Card.svelte';
	import { ShopDescription, ShopDescriptionLong, ShopName, ShopTagLine } from '$lib/constants';
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<div class="space-y-4">
	<Card padding="p-2">
		<svelte:fragment slot="header">
			<div class="flex flex-row items-center space-x-6">
				<Avatar src="https://api.dicebear.com/8.x/pixel-art/svg" width="w-20" />
				<div class="space-y-3">
					<h1 class="h2 font-bold">{ShopName}</h1>
					<p class="text-xs badge bg-surface-800/60">{ShopTagLine}</p>
				</div>
			</div>
		</svelte:fragment>
		<svelte:fragment slot="body">
			<div class="flex flex-col space-y-6">
				<div>
					<div
						class="bg-surface-800/60 md:rounded-lg rounded-sm p-4 border-l-yellow-500 border-l-4 md:border-l-8"
					>
						<p class="text-md line-clamp-5">
							{ShopDescription} Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias perferendis
							architecto quam soluta iste quidem sequi obcaecati accusamus doloribus tenetur possimus
							dolorum eos deleniti alias laudantium harum iure, facere velit.
						</p>
					</div>
				</div>
				<div class="flex flex-col space-y-3 md:flex-row md:space-y-0 justify-center md:space-x-3">
					<button type="button" class="btn bg-[#7360f2] btn-md">
						<span><i class="fa-brands fa-viber text-3xl"></i></span>
						<span>Join Viber</span>
					</button>
					<a class="btn variant-filled btn-md" data-sveltekit-preload-data="hover" href="/shop">
						<span><i class="fa-solid fa-cart-shopping text-3xl"></i></span>
						<span>View Products</span>
					</a>
				</div>
			</div>
		</svelte:fragment>
	</Card>
	<Card padding="p-2">
		<svelte:fragment slot="header">
			<div class="flex flex-row items-center space-x-6">
				<h1 class="h2 font-bold">Extra Info</h1>
			</div>
		</svelte:fragment>
		<svelte:fragment slot="body">
			{ShopDescriptionLong} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed, deleniti delectus
			eveniet excepturi voluptas harum dolorem, est nemo facilis quisquam, fuga quod dolores corporis
			tenetur consequatur possimus voluptatem sunt? Exercitationem?
		</svelte:fragment>
	</Card>
</div>
