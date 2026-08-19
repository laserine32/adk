<script lang="ts">
	import { cn } from '$lib/utils';
	import Skeleton from './skeleton.svelte';

	const data = [...Array(140).keys()];
	const width = ['px-12', 'px-8', 'px-10'];
</script>

<div class="my-8 flex w-full flex-wrap items-center justify-center gap-2">
	{#each data as item, index (index)}
		{@const random = Math.floor(Math.random() * width.length)}
		<Skeleton data-item={item} className={cn(width[random], 'rounded py-4')} />
	{/each}
</div>
