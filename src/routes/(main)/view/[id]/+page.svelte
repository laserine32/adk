<script lang="ts">
	import LazyImage from '$lib/components/lazy-image.svelte';
	import SkeletonView from '$lib/components/skeletons/skeleton-view.svelte';
	import ExpandTitle from '$lib/components/view/expand-title.svelte';
	import RenderNav from '$lib/components/view/render-nav.svelte';
	import RenderTags from '$lib/components/view/render-tags.svelte';
	import TagRender from '$lib/components/view/tag-render.svelte';
	import type { CDNType, NHTag } from '$lib/nhapi';
	import type { KomikPage } from '$lib/server/db/queries/komik';
	import { formatStringTimeAgo, unicodeToChar } from '$lib/utils';

	interface ViewProps {
		title: string;
		dataKomik: KomikPage;
		image_cdn: CDNType;
	}
	const { data }: { data: ViewProps } = $props();
	const komik = $derived(data.dataKomik.data);
	const { image_servers, thumb_servers } = $derived(data.image_cdn);
	const imgsrc = $derived.by(() => {
		let cdn_thumb = thumb_servers[Math.floor(Math.random() * thumb_servers.length)];
		const testurl = komik?.cover.split('/')[2][0];
		if (testurl == 'i') {
			cdn_thumb = image_servers[Math.floor(Math.random() * image_servers.length)];
		}
		return cdn_thumb + '/' + komik?.cover.split('/').slice(-3).join('/');
	});
	const dataTags: NHTag[] = $derived.by(() => {
		let tmp: NHTag[] = [];
		komik?.tags.forEach((e) => {
			tmp.push({
				id: e.id,
				type: e.type,
				name: e.name,
				slug: e.name,
				url: e.name,
				count: -1
			} as NHTag);
		});
		return tmp;
	});
</script>

{#await data}
	<SkeletonView />
{:then data}
	<div class="my-4 grid grid-cols-1 gap-4 rounded bg-border p-4 md:grid-cols-2">
		<div class="flex items-center justify-center">
			<img src={imgsrc} class="w-1/2" alt={data.title} loading="lazy" />
		</div>
		<div>
			<h1 class="mb-6 text-xl font-bold text-foreground">
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
	<div
		class="flex flex-col items-center justify-center md:flex-row-reverse md:flex-wrap md:items-center md:gap-2"
	>
		{#each komik?.pages as page, index (`${index}${page.id}`)}
			{@const cdn_thumb = image_servers[index % image_servers.length]}
			{@const pimgsrc = cdn_thumb + '/' + page.img.split('/').slice(-3).join('/')}
			<div class="md:w-[20vw]">
				<LazyImage src={pimgsrc} alt={`${page.num}`} className="w-full mb-1" />
			</div>
		{/each}
	</div>
	<RenderNav data={data.dataKomik.nav} />
{/await}
