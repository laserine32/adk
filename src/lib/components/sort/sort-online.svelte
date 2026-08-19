<script lang="ts">
	import { page } from '$app/state';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import SortNavButton from './sort-nav-button.svelte';

	let pathname: string = $derived(page.url.pathname);
	let currentSort: string = $derived(page.url.searchParams.get('sort') || 'date');
	let createPageURL = (sort: string): string => {
		const params: URLSearchParams = new SvelteURLSearchParams(page.url.searchParams);
		params.set('sort', sort);
		return `${pathname}?${params.toString()}`;
	};
</script>

<div class="inline-flex gap-4">
	<SortNavButton
		text="Recent"
		position="single"
		href={createPageURL('date')}
		isActive={currentSort == 'date'}
	/>
	<div class="flex items-center -space-x-px">
		<h3 class="mr-2">Popular:</h3>
		<SortNavButton
			text="Week"
			position="first"
			href={createPageURL('popular-week')}
			isActive={currentSort == 'popular-week'}
		/>
		<SortNavButton
			text="Month"
			position="middle"
			href={createPageURL('popular-month')}
			isActive={currentSort == 'popular-month'}
		/>
		<SortNavButton
			text="All Time"
			position="last"
			href={createPageURL('popular')}
			isActive={currentSort == 'popular'}
		/>
	</div>
</div>
