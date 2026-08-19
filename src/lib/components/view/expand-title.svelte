<script lang="ts">
	import type { NHTitle } from '$lib/nhapi';

	type TitlePart = {
		type: 'pretty' | 'other';
		value: string;
	};
	const { english, pretty }: NHTitle = $props();
	let index = $derived(english.indexOf(pretty));
	let result: TitlePart[] = $derived.by((): TitlePart[] => {
		if (index === -1) return [];
		const before = english.slice(0, index).trim();
		const after = english.slice(index + pretty.length).trim();
		let tmp: TitlePart[] = [];
		if (before) {
			tmp.push({ type: 'other', value: before });
		}
		tmp.push({ type: 'pretty', value: pretty });
		if (after) {
			tmp.push({ type: 'other', value: after });
		}
		return tmp;
	});
</script>

{#if index === -1}
	<span class="text-foreground/5">{english}</span>
{/if}
{#if result.length > 0}
	{#each result as item, index (`${index}`)}
		{#if item.type == 'other'}
			<span class="text-foreground/60">
				{item.value}
			</span>
		{:else}
			<span class="text-foreground">
				{` ${item.value} `}
			</span>
		{/if}
	{/each}
{/if}
