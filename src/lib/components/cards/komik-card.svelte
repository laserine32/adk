<script lang="ts">
	import { resolve } from '$app/paths';
	import type { KomikWithTag } from '$lib/server/db/queries/komik';
	import { formatDateToLocal } from '$lib/utils';
	import LazyImage from '../lazy-image.svelte';

	const { imgsrc, linkhref, data }: { imgsrc: string; linkhref: string; data: KomikWithTag } =
		$props();
</script>

<div class="linking group">
	<div class="relative h-[40vw] overflow-hidden rounded-xl md:h-[20vw]">
		<a href={resolve(`/${linkhref}` as `/`)} aria-label={data.title}>
			<LazyImage
				src={imgsrc}
				alt={data.title}
				className="h-full w-full object-cover transition-all duration-200 ease-in-out group-hover:scale-125"
			/>
			<div class="absolute right-2 bottom-2 rounded bg-green-600 px-4">
				<p class="text-xs">{`${data.numPages} Pages`}</p>
			</div>
		</a>
	</div>
	<div class="relative">
		<div class="text-primary mt-1 flex items-center justify-start truncate">
			<a href={resolve(`${linkhref}` as `/`)} aria-label={data.title}>
				<p class="text-md text-foreground">{data.prettyTitle}</p>
				<p class="text-sm text-muted">{data.tag}</p>
				<p class="text-sm text-muted">{formatDateToLocal(data.date)}</p>
			</a>
		</div>
		<div
			class="text-primary absolute top-0 right-0 left-0 z-50 mt-1 hidden items-center justify-start rounded bg-border p-2 group-hover:flex"
		>
			<a href={resolve(`${linkhref}` as `/`)} aria-label={data.title}>
				<p class="text-md text-foreground">{data.prettyTitle}</p>
				<p class="text-sm text-muted">{data.tag}</p>
				<p class="text-sm text-muted">{formatDateToLocal(data.date)}</p>
			</a>
		</div>
	</div>
</div>
