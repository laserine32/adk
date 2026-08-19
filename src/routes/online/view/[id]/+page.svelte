<script lang="ts">
	import { resolve } from '$app/paths';
	import ChapterListOnline from '$lib/components/chapter-list-online.svelte';
	import ArrowPathIcon from '$lib/components/icons/ArrowPathIcon.svelte';
	import LazyImage from '$lib/components/lazy-image.svelte';
	import SkeletonView from '$lib/components/skeletons/skeleton-view.svelte';
	import ExpandTitle from '$lib/components/view/expand-title.svelte';
	import RenderTags from '$lib/components/view/render-tags.svelte';
	import TagRender from '$lib/components/view/tag-render.svelte';
	import { cn, formatUnixTimeAgo, unicodeToChar } from '$lib/utils';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';

	const { data }: PageProps = $props();
	const komik = $derived(data.komik);
	const { image_servers, thumb_servers } = $derived(data.image_cdn);
	const imgsrc = $derived.by(() => {
		let cdn_thumb = thumb_servers[Math.floor(Math.random() * thumb_servers.length)];
		return cdn_thumb + '/' + komik?.cover.path;
	});
	let isAvailable = $derived(data.available);
	let isLoading = $state(false);

	const toBase64 = (text: string) => {
		const utf8Bytes = new TextEncoder().encode(text);
		const binaryString = String.fromCharCode(...utf8Bytes);
		return btoa(binaryString);
	};

	const genIdPage = (idkomik: string, num: string) => {
		return `${idkomik}${num.padStart(4, '0')}`;
	};
</script>

{#await data}
	<SkeletonView />
{:then data}
	{@const parcel = {
		komik: {
			id: data.komik.id,
			title: data.komik.title.english,
			japaneseTitle: data.komik.title.japanese,
			prettyTitle: data.komik.title.pretty,
			images: toBase64(JSON.stringify(data)),
			cover: `${thumb_servers[0]}/${data.komik.cover.path}`,
			uploadDate: data.komik.upload_date,
			numPages: data.komik.num_pages,
			numFavorites: data.komik.num_favorites,
			numId: 0
		},
		pages: data.komik.pages.map((e) => ({
			id: genIdPage(`${data.komik.id}`, `${e.number}`),
			komikId: data.komik.id,
			img: `${image_servers[0]}/${e.path}`,
			num: e.number
		})),
		tags: data.komik.tags.map((e) => ({
			id: e.id,
			type: e.type,
			name: e.name
		})),
		tagsOnKomik: data.komik.tags.map((e) => ({
			komikId: data.komik.id,
			tagsId: e.id
		}))
	}}
	<div class="my-4 grid grid-cols-1 gap-4 rounded bg-border p-4 md:grid-cols-2">
		<div class="flex items-center justify-center">
			<img src={imgsrc} class="w-1/2" alt={data.komik.title.english} loading="lazy" />
		</div>
		<div>
			<h1 class="mb-6 text-xl font-bold text-foreground">
				<ExpandTitle
					english={komik.title.english}
					pretty={komik.title.pretty}
					japanese={komik.title.japanese}
				/>
			</h1>
			<h3 class=" mb-6 text-foreground">{unicodeToChar(komik.title.japanese)}</h3>
			<div class="my-4 w-full flex-row">
				<RenderTags pathName="/online" data={komik.tags} />
				<TagRender pathName="/online" title="Pages" data={`${komik.num_pages}`} />
				<div class="my-2 flex items-center gap-1">
					<h3 class="min-w-18 md:min-w-24">Added</h3>
					<p class="text-foreground/60">{formatUnixTimeAgo(`${komik.upload_date}`)}</p>
				</div>
				{#if isAvailable}
					<div class="my-4 flex w-full">
						<a href={resolve(`/view/${data.komik.id}` as `/`)} class="w-full">
							<div
								class="flex w-full cursor-pointer items-center justify-center rounded bg-input px-2 py-1 hover:bg-input/50"
							>
								View
							</div>
						</a>
					</div>
				{:else}
					<form
						method="POST"
						action="?/submitData"
						use:enhance={() => {
							// Dijalankan saat tombol diklik (sebelum request berangkat)
							isLoading = true;

							return async ({ update }) => {
								// Dijalankan setelah request selesai
								await update();
								isLoading = false;
							};
						}}
					>
						<input type="hidden" name="parcel" value={JSON.stringify(parcel)} />

						<div class="my-4 flex w-full">
							<button
								class={cn(
									'flex w-full cursor-pointer items-center justify-center rounded bg-input px-2 py-1 hover:bg-input/50',
									isLoading && `cursor-none bg-input/50`
								)}
							>
								{#if isLoading}
									<ArrowPathIcon />
								{:else}
									Save
								{/if}
							</button>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</div>
	<div
		class="flex flex-col items-center justify-center md:flex-row-reverse md:flex-wrap md:items-center md:gap-2"
	>
		{#each data.komik.pages as page, index (`${index}${page.number}`)}
			{@const cdn_thumb = image_servers[index % image_servers.length]}
			{@const pimgsrc = cdn_thumb + '/' + page.path}
			<div class="md:w-[20vw]">
				<LazyImage src={pimgsrc} alt={`${page.number}`} className="w-full mb-1" />
			</div>
		{/each}
	</div>
	<div class="my-4 flex flex-col rounded bg-border p-4">
		<h1 class="mb-6 text-center text-xl font-bold">More Like This</h1>
		<div class="my-4 grid grid-cols-2 gap-4 md:grid-cols-5">
			{#each data.related.result as related, index (index)}
				<ChapterListOnline data={related} pathName="/online" image_cdn={data.image_cdn} />
			{/each}
		</div>
	</div>
{/await}
