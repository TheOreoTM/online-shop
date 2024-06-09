<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each $cart as item}
	<div class="item">
		<div class="item-info">
			<p>{item.name}</p>
			<p>{item.price}</p>
		</div>
	</div>
{/each}
