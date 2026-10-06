<script lang="ts">
	import TagIcon from '$lib/components/icons/TagIcon.svelte';
	import SkeletonTags from '$lib/components/skeletons/skeleton-tags.svelte';
	import { capitalizeFirstLetter } from '$lib/utils';
	import { resolve } from '$app/paths';
	import Badge from '$lib/components/view/badge.svelte';

	const { data } = $props();
</script>

<div class="flex items-center justify-center gap-4">
	<TagIcon />
	<h1 class="text-2xl font-bold">Tags</h1>
</div>
{#await data.streamed.tagsPromise}
	<SkeletonTags />
{:then dataTags}
	{@const groupTag = Object.groupBy(dataTags, (e) => e.type)}
	{@const items = Object.entries(groupTag).map(([gr, it]) => ({
		group: capitalizeFirstLetter(gr),
		tags: it
	}))}
	{#each items as item, index (index)}
		<h2>{item.group}</h2>
		<div class="my-8 flex w-full flex-wrap items-center justify-center gap-2">
			{#each item.tags as tag, idx (idx)}
				<a href={resolve(`/tags/${tag.id}` as '/')} aria-label={tag.name}>
					<Badge text={tag.name} count={tag.count} />
				</a>
			{/each}
		</div>
	{/each}
{/await}
