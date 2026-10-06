<script lang="ts">
	import LazyImage from '$lib/components/lazy-image.svelte';
	import SkeletonView from '$lib/components/skeletons/skeleton-view.svelte';
	import ExpandTitle from '$lib/components/view/expand-title.svelte';
	import RenderNav from '$lib/components/view/render-nav.svelte';
	import RenderTags from '$lib/components/view/render-tags.svelte';
	import TagRender from '$lib/components/view/tag-render.svelte';
	import type { NHTag } from '$lib/nhapi';
	import { formatStringTimeAgo, unicodeToChar } from '$lib/utils';

	const { data } = $props();
	let isDebug = $state(false);
</script>

{#await data.streamed.komikPromise}
	<SkeletonView />
{:then dataThen}
	{@const komik = dataThen.data}
	{@const dataTags: NHTag[] = komik!.tags.map((e) => ({
			id: e.id,
			type: e.type,
			name: e.name,
			slug: e.name,
			url: e.name,
			count: -1
		}))}
	<div
		data-sveltekit-reload
		class="my-4 grid grid-cols-1 gap-4 rounded bg-border p-4 md:grid-cols-2"
	>
		<div class="flex items-center justify-center">
			<img src={komik?.newCover} class="w-1/2" alt={komik?.title} loading="lazy" />
		</div>
		<div>
			<h1 class="mb-6 text-xl font-bold">
				<ExpandTitle
					english={komik?.title || ''}
					pretty={komik?.prettyTitle || ''}
					japanese={komik?.japaneseTitle || ''}
				/>
			</h1>
			<h3 class=" mb-6 text-foreground">{unicodeToChar(komik?.japaneseTitle || ``)}</h3>
			<div class="my-4 w-full flex-row">
				<RenderTags pathName="/" data={dataTags} />
				<TagRender pathName="/" title="Pages" data={`${komik?.numPages}`} />
				<div class="my-2 flex items-center gap-1">
					<h3 class="min-w-18 md:min-w-24">Added</h3>
					<p class="text-foreground/60">{formatStringTimeAgo(`${komik?.date}`)}</p>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col justify-center md:flex-row-reverse md:flex-wrap md:gap-2">
		{#each komik?.pages as page, index (`${index}${page.id}`)}
			<div class="relative md:w-[20vw]">
				{#if isDebug}
					<p class="absolute top-2 left-2 bg-black p-1 text-white">
						{`${page.num} ~ ${page.newImg.slice(-10)}`}
					</p>
				{/if}
				<LazyImage src={page.newImg} alt={`${page.num}`} className="w-full mb-1" />
			</div>
		{/each}
	</div>
	<RenderNav data={dataThen.nav} />
{/await}
