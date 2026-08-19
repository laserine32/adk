<script>
	import ChapterList from '$lib/components/chapter-list.svelte';
	import TagIcon from '$lib/components/icons/TagIcon.svelte';
	import Pagination from '$lib/components/paginations/pagination.svelte';
	import SkeletonKomik from '$lib/components/skeletons/skeleton-komik.svelte';
	const { data } = $props();
</script>

<div class="flex items-center justify-center gap-4">
	<TagIcon />
	<h1 class="text-2xl font-bold">{data.tag.name}</h1>
</div>
<div class="my-8 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
	{#await data.komik}
		<SkeletonKomik />
	{:then komik}
		{#each komik as item (item.id)}
			<ChapterList data={item} pathName={`/tags/${data.tag.id}`} image_cdn={data.image_cdn} />
		{/each}
	{/await}
</div>
<div class="my-28 flex justify-center">
	<Pagination totalPages={data.totalPage} />
</div>
