<script lang="ts">
	import type { NavKomikPage } from '$lib/server/db/queries/komik';
	import { cn } from '$lib/utils';
	import { resolve } from '$app/paths';
	import ChevronDoubleLeftIcon from '../icons/ChevronDoubleLeftIcon.svelte';
	import ListBulletIcon from '../icons/ListBulletIcon.svelte';
	import ChevronDoubleRightIcon from '../icons/ChevronDoubleRightIcon.svelte';

	const { data }: { data: NavKomikPage } = $props();
	let list = $derived(data?.list ?? ``);
	let prev = $derived(data?.prev ?? ``);
	let next = $derived(data?.next ?? ``);
</script>

{#await data}
	<p>Loading...</p>
{:then data}
	<div class="sticky bottom-0">
		<div class="grid grid-cols-3">
			<a
				href={resolve(`/${prev}` as `/`)}
				class={cn(
					'linking flex items-center justify-center gap-2 rounded-l-md bg-dialect py-2.5 text-white hover:bg-muted',
					!data?.prev && 'pointer-events-none'
				)}
			>
				<ChevronDoubleLeftIcon />
				<p class="hidden md:block">Next Comic</p>
			</a>
			<a
				href={resolve(`${list}` as `/`)}
				class="linking flex items-center justify-center gap-2 bg-background py-2.5 text-primary-foreground hover:bg-muted"
			>
				<p class="hidden md:block">List Comic</p>
				<ListBulletIcon className="size-6 block md:hidden" />
			</a>
			<a
				href={resolve(`/${next}` as `/`)}
				class={cn(
					'linking flex items-center justify-center gap-2 rounded-r-md bg-dialect py-2.5 text-white hover:bg-muted',
					!data?.next && 'pointer-events-none'
				)}
			>
				<p class="hidden md:block">Prev Comic</p>
				<ChevronDoubleRightIcon />
			</a>
		</div>
	</div>
{/await}
