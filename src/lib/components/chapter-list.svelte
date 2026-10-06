<script lang="ts">
	import type { KomikWithTag } from '$lib/server/db/queries/komik';
	import { isMobile } from '$lib/utils';
	import KomikCardMobile from './cards/komik-card-mobile.svelte';
	import KomikCard from './cards/komik-card.svelte';

	interface CardProps {
		data: KomikWithTag;
		pathName: string;
	}

	const { data, pathName }: CardProps = $props();
	let isMobi = $state(isMobile());
	let linkhref = $derived(`${pathName}/view/${data.id}`);
	const imgsrc = $derived(data.newCover);

	$effect(() => {
		function handleResize() {
			isMobi = isMobile();
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

{#if isMobi}
	<KomikCardMobile {linkhref} {imgsrc} {data} />
{:else}
	<KomikCard {linkhref} {imgsrc} {data} />
{/if}
