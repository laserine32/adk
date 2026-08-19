<script lang="ts">
	import type { NHTag } from '$lib/nhapi';
	import { capitalizeFirstLetter } from '$lib/utils';
	import type { ElmProps } from '$lib/types';
	import TagRender from './tag-render.svelte';

	interface tagsProps {
		pathName?: string;
		data: NHTag[];
	}

	const { data, pathName = '/' }: tagsProps = $props();

	const items = $derived(Object.groupBy(data, (e) => e.type));
	const elm: ElmProps[] = $derived.by(() => {
		let tmp: ElmProps[] = [];
		for (const e in items) {
			const item: NHTag[] = items[e] ?? [];
			tmp.push({
				title: capitalizeFirstLetter(e),
				data: item,
				pathName: pathName
			});
		}
		return tmp;
	});
</script>

{#if elm}
	{#each elm as item, index (index)}
		<TagRender data={item.data} title={item.title} pathName={item.pathName} />
	{/each}
{/if}
