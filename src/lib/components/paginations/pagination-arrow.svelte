<script lang="ts">
	import { resolve } from '$app/paths';
	import { cn } from '$lib/utils';
	import ChevronDoubleLeftIcon from '../icons/ChevronDoubleLeftIcon.svelte';
	import ChevronDoubleRightIcon from '../icons/ChevronDoubleRightIcon.svelte';

	interface PaginationArrowProps {
		href: string;
		direction: 'left' | 'right';
		isDisabled: boolean;
	}
	const { href, direction, isDisabled }: PaginationArrowProps = $props();

	let className = $derived(
		cn(
			'linking flex h-10 w-10 items-center justify-center text-sm border border-dialect rounded-sm',
			{
				'pointer-events-none text-muted-foreground': isDisabled,
				'hover:bg-primary hover:text-primary-foreground': !isDisabled,
				'mr-2': direction === 'left',
				'ml-2': direction === 'right'
			}
		)
	);
	let PageIcon = $derived(direction == 'left' ? ChevronDoubleLeftIcon : ChevronDoubleRightIcon);
</script>

{#if isDisabled}
	<div class={className}><PageIcon /></div>
{:else}
	<a href={resolve(href as '/')} class={className}><PageIcon /></a>
{/if}
