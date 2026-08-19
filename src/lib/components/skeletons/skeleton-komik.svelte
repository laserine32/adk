<script lang="ts">
	import { isMobile } from '$lib/utils';
	import Skeleton from './skeleton.svelte';

	const data: Array<number> = [...Array(12).keys()];
	const isM = isMobile();
</script>

{#each data as item (item)}
	{#if isM}
		<div class="group grid grid-cols-3 gap-2">
			<Skeleton className="h-[40vw] w-full rounded-xl md:h-[20vw]" />
			<div class=" col-span-2">
				<Skeleton className="mb-3 h-6 w-full" />
				<Skeleton className="mb-3 h-4 w-full" />
			</div>
		</div>
	{:else}
		<div class="group">
			<Skeleton className="h-[40vw] w-full rounded-xl md:h-[20vw]" />
			<Skeleton className="mt-3 h-6 w-full" />
		</div>
	{/if}
{/each}
