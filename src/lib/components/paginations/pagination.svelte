<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import { cn, generatePagination, type paginationGenerated } from '$lib/utils';
	import PaginationArrow from './pagination-arrow.svelte';

	interface PaginationProps {
		totalPages: number;
	}
	type Position = 'first' | 'middle' | 'last' | 'single' | undefined;

	const { totalPages }: PaginationProps = $props();
	let pathname: string = $derived(page.url.pathname);
	let currentPage: number = $derived(Number(page.url.searchParams.get('page')) || 1);
	let createPageURL = (pageNumber: number): string => {
		const params: URLSearchParams = new SvelteURLSearchParams(page.url.searchParams);
		params.set('page', pageNumber.toString());
		return `${pathname}?${params.toString()}`;
	};
	const allPages: paginationGenerated = $derived(generatePagination(currentPage, totalPages));

	const getPosition = (page: number | string, index: number): Position => {
		if (index === 0) return 'first';
		if (index === allPages.length - 1) return 'last';
		if (allPages.length === 1) return 'single';
		if (page === '...') return 'middle';
		return undefined;
	};
</script>

<div class="inline-flex">
	<PaginationArrow
		direction="left"
		href={createPageURL(currentPage - 1)}
		isDisabled={currentPage <= 1}
	/>
	<div class="flex -space-x-px">
		{#each allPages as page, idx (`${idx}${page}`)}
			{@const isActive = currentPage == page}
			{@const position = getPosition(page, idx)}
			{@const className = cn(
				'linking flex h-10 w-10 items-center justify-center text-sm border border-dialect',
				{
					'rounded-l-sm': position === 'first' || position === 'single',
					'rounded-r-sm': position === 'last' || position === 'single',
					'z-10 bg-dialect text-primary-foreground boder-border': isActive,
					'hover:bg-primary hover:text-primary-foreground': !isActive && position !== 'middle',
					'text-secondary-foreground pointer-events-none': position === 'middle'
				}
			)}
			{#if isActive && position === 'middle'}
				<div class={className}>{page}</div>
			{:else}
				{@const phref = createPageURL(Number(page))}
				<a href={resolve(phref as '/')} class={className}>{page}</a>
			{/if}
		{/each}
	</div>
	<PaginationArrow
		direction="right"
		href={createPageURL(currentPage + 1)}
		isDisabled={currentPage >= totalPages}
	/>
</div>
