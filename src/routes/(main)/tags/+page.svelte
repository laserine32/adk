<script lang="ts">
	import TagIcon from '$lib/components/icons/TagIcon.svelte';
	import SkeletonTags from '$lib/components/skeletons/skeleton-tags.svelte';
	import { type NewTags } from '$lib/server/db/queries/tags';
	import { capitalizeFirstLetter } from '$lib/utils';
	import { resolve } from '$app/paths';
	import Badge from '$lib/components/view/badge.svelte';

	interface TagsPageProps {
		dataTags: NewTags[];
	}

	const { data }: { data: TagsPageProps } = $props();
	let items = $derived.by(() => {
		const group = Object.groupBy(data.dataTags, (e) => e.type);
		const tags = [];
		for (const e in group) {
			tags.push({
				group: capitalizeFirstLetter(e),
				tags: group[e]
			});
		}
		return tags;
	});
</script>

<div class="flex items-center justify-center gap-4">
	<TagIcon />
	<h1 class="text-2xl font-bold">Tags</h1>
</div>
{#await data}
	<SkeletonTags />
	<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
{:then dataTags}
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
