<script lang="ts">
	import { page } from '$app/state';
	import ChapterList from '$lib/components/chapter-list.svelte';
	import FireIcon from '$lib/components/icons/fire_icon.svelte';
	import Pagination from '$lib/components/paginations/pagination.svelte';
	import SkeletonKomik from '$lib/components/skeletons/skeleton-komik.svelte';
	import type { CDNType } from '$lib/nhapi.js';

	const { data } = $props();
	let search_query = $derived(page.url.searchParams.get('s') || '');
	type ImageCdn = {
		loading: boolean;
		data: CDNType;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		error: any;
	};
	let image_cdn: ImageCdn = $derived.by(() => {
		let state: ImageCdn = {
			loading: true,
			data: { image_servers: [], thumb_servers: [] },
			error: null
		};

		data.streamed.image_cdn
			.then((result) => {
				state.data = result;
				state.loading = false;
			})
			.catch((err) => {
				state.error = err;
				state.loading = false;
			});

		return state;
	});
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
	{#await data.streamed.komikPromise}
		<SkeletonKomik />
	{:then komik}
		{#each komik as item (item.id)}
			<ChapterList data={item} pathName="" image_cdn={image_cdn.data} />
		{/each}
	{/await}
</div>
<div class="my-28 flex justify-center">
	{#await data.streamed.totalPagePromise then totalPage}
		<Pagination totalPages={totalPage} />
	{/await}
</div>
