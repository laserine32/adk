<script lang="ts">
	import type { ElmProps } from '$lib/types';
	import { resolve } from '$app/paths';
	import Badge from './badge.svelte';

	const item: ElmProps = $props();
</script>

<div class="my-2 flex items-center gap-1">
	<h3 class="min-w-18 md:min-w-24">{item.title}</h3>
	<div class="flex flex-wrap gap-1">
		{#if typeof item.data == 'string'}
			<Badge text={item.data} />
		{:else}
			{#each item.data as tag, index (index)}
				<a href={resolve(`${item.pathName}/tags/${tag.id}` as '/')} aria-label={tag.name}>
					<Badge text={tag.name} count={tag.count} />
				</a>
			{/each}
		{/if}
	</div>
</div>
