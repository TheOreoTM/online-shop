<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<form method="post" action="?/OAuth2">
	<button class="btn variant-filled" type="submit">Sign up</button>
</form>
