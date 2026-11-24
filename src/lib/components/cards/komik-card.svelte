<script lang="ts">
	import { resolve } from '$app/paths';
	import type { KomikWithTag } from '$lib/server/db/queries/komik';
	import { formatDateToLocal } from '$lib/utils';
	import LazyImage from '../lazy-image.svelte';

	const { imgsrc, linkhref, data }: { imgsrc: string; linkhref: string; data: KomikWithTag } =
		$props();
</script>

<div class="linking group">
	<a href={resolve(`/${linkhref}` as `/`)} aria-label={data.title}>
		<div class="relative h-[40vw] overflow-hidden rounded-xl md:h-[20vw]">
			<LazyImage
				src={imgsrc}
				alt={data.title}
				className="h-full w-full object-cover transition-all duration-200 ease-in-out group-hover:scale-125"
			/>
			<div class="absolute top-2 right-2 rounded bg-green-600 px-4">
				<p class="text-xs">{`${data.numPages} Pages`}</p>
			</div>
			<div class="absolute right-0 bottom-0 left-0 rounded bg-black/85 p-4">
				<div
					class="text-primary flex-row items-center justify-start truncate group-hover:whitespace-normal"
				>
					<p class="text-md text-foreground">{data.prettyTitle}</p>
					<p class="text-sm text-muted">{data.tag}</p>
					<p class="text-sm text-muted">{formatDateToLocal(data.date)}</p>
				</div>
			</div>
		</div>
	</a>
</div>
