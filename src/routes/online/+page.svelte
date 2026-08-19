<script lang="ts">
	import ChapterListOnline from '$lib/components/chapter-list-online.svelte';
	import FireIcon from '$lib/components/icons/fire_icon.svelte';
	import Pagination from '$lib/components/paginations/pagination.svelte';
	import SkeletonKomik from '$lib/components/skeletons/skeleton-komik.svelte';
	import SortOnline from '$lib/components/sort/sort-online.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<div class="flex items-center justify-center gap-4">
	<FireIcon />
	<h1 class="text-2xl font-bold">Online</h1>
</div>
<div class="my-4 flex items-center justify-center gap-4">
	<SortOnline />
</div>
{#if data.query != ''}
	<p>Search result for: "{data.query}"</p>
{/if}
<div class="my-8 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
	{#await data}
		<SkeletonKomik />
	{:then data}
		{@const komikOnline = data.komik}
		{#if komikOnline.result.length == 0}
			<div>
				<h4>Not Found!</h4>
			</div>
		{/if}
		{#each komikOnline.result as item (item.id)}
			<ChapterListOnline data={item} pathName="/online" image_cdn={data.image_cdn} />
		{/each}
	{/await}
</div>
<div class="my-28 flex justify-center">
	<Pagination totalPages={data.totalPage} />
</div>
