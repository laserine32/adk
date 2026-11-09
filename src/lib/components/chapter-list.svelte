<script lang="ts">
	import type { CDNType } from '$lib/nhapi';
	import type { KomikWithTag } from '$lib/server/db/queries/komik';
	import { isMobile } from '$lib/utils';
	import KomikCardMobile from './cards/komik-card-mobile.svelte';
	import KomikCard from './cards/komik-card.svelte';

	interface CardProps {
		data: KomikWithTag;
		pathName: string;
		image_cdn?: CDNType;
	}

	const { data, pathName, image_cdn }: CardProps = $props();
	let isMobi = $state(isMobile());
	let linkhref = $derived(`${pathName}/view/${data.id}`);

	const { image_servers, thumb_servers } = $derived(
		image_cdn ?? { image_servers: [], thumb_servers: [] }
	);
	const imgsrc = $derived.by(() => {
		if (data.newCover !== null) {
			return data.newCover;
		}
		if (image_servers.length === 0 || thumb_servers.length === 0) {
			return data.cover;
		}
		let cdn_thumb = thumb_servers[Math.floor(Math.random() * thumb_servers.length)];
		const testurl = data.cover.split('/')[2][0];
		if (testurl == 'i') {
			cdn_thumb = image_servers[Math.floor(Math.random() * image_servers.length)];
		}
		return cdn_thumb + '/' + data.cover.split('/').slice(-3).join('/');
	});
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
