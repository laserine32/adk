<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		getLanguage,
		type CDNType,
		type relatedType,
		type ResultNHMainPageType
	} from '$lib/nhapi';
	import { isMobile } from '$lib/utils';
	import LazyImage from './lazy-image.svelte';

	interface CardProps {
		data: ResultNHMainPageType | relatedType;
		pathName: string;
		image_cdn: CDNType;
	}

	const { data, pathName, image_cdn }: CardProps = $props();
	let isMobi = $state(isMobile());
	let linkhref = $derived(`${pathName}/view/${data.id}`);
	const { thumb_servers } = $derived(image_cdn);
	const imgsrc = $derived.by(() => {
		let cdn_thumb = thumb_servers[Math.floor(Math.random() * thumb_servers.length)];
		return cdn_thumb + '/' + data.thumbnail;
	});
	let tagLanguage = $derived(getLanguage(data.tag_ids));
	let language = $derived(tagLanguage ? tagLanguage.flag : ``);
	$effect(() => {
		function handleResize() {
			isMobi = isMobile();
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

{#if isMobi}
	<div class="linking group grid grid-cols-3 gap-2">
		<div class="relative h-[40vw] overflow-hidden rounded-xl md:h-[20vw]">
			<a href={resolve(`/${linkhref}` as `/`)} aria-label={`${data.id}`}>
				<LazyImage
					src={imgsrc}
					alt={data.media_id}
					className="h-full w-full object-cover transition-all duration-200 ease-in-out group-hover:scale-125 group-hover:blur-sm"
				/>
				<div class="absolute right-2 bottom-2 rounded bg-green-600 px-4">
					<p class="text-xs">{`${data.num_pages} Pages`}</p>
				</div>
			</a>
		</div>
		<div class="relative col-span-2">
			<div class="text-primary mt-1 flex items-center justify-start">
				<a href={resolve(`${linkhref}` as `/`)} aria-label={`${data.id}`}>
					<p class="text-sm font-semibold text-foreground">{language} {data.english_title}</p>
				</a>
			</div>
		</div>
	</div>
{:else}
	<div class="linking group">
		<div class="relative h-[40vw] overflow-hidden rounded-xl md:h-[20vw]">
			<a href={resolve(`/${linkhref}` as `/`)} aria-label={`${data.id}`}>
				<LazyImage
					src={imgsrc}
					alt={data.media_id}
					className="h-full w-full object-cover transition-all duration-200 ease-in-out group-hover:scale-125"
				/>
				<div class="absolute right-2 bottom-2 rounded bg-green-600 px-4">
					<p class="text-xs">{`${data.num_pages} Pages`}</p>
				</div>
			</a>
		</div>
		<div class="relative">
			<div class="text-primary mt-1 flex items-center justify-start truncate">
				<a href={resolve(`${linkhref}` as `/`)} aria-label={`${data.id}`}>
					<p class="text-md text-foreground">{language} {data.english_title}</p>
				</a>
			</div>
			<div
				class="text-primary absolute top-0 right-0 left-0 z-50 mt-1 hidden items-center justify-start rounded bg-border p-2 group-hover:flex"
			>
				<a href={resolve(`${linkhref}` as `/`)} aria-label={`${data.id}`}>
					<p class="text-md text-foreground">{language} {data.english_title}</p>
				</a>
			</div>
		</div>
	</div>
{/if}
