<script>
	import { page } from '$app/state';
	import ChapterList from '$lib/components/chapter-list.svelte';
	import FireIcon from '$lib/components/icons/fire_icon.svelte';
	import Pagination from '$lib/components/paginations/pagination.svelte';
	import SkeletonKomik from '$lib/components/skeletons/skeleton-komik.svelte';

	const { data } = $props();
	let search_query = $derived(page.url.searchParams.get('s') || '');
</script>

<svelte:head><title>ADK</title></svelte:head>
<div class="flex items-center justify-center gap-4">
	<FireIcon />
	<h1 class="text-2xl font-bold">Home</h1>
</div>
{#if search_query != ''}
	<p>Search result for: "{search_query}"</p>
{/if}
<div class="my-8 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
	{#await data.komik}
		<SkeletonKomik />
	{:then komik}
		{#each komik as item (item.id)}
			<ChapterList data={item} pathName="" image_cdn={data.image_cdn} />
		{/each}
	{/await}
</div>
<div class="my-28 flex justify-center">
	<Pagination totalPages={data.totalPage} />
</div>
