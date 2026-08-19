<script lang="ts">
	import blankImg from '$lib/assets/blank.svg';
	import { lazyLoad } from './lazyLoad';

	type LazyImageProps = {
		src: string;
		className?: string;
		alt?: string;
	};

	const data: LazyImageProps = $props();
	let alt = $derived(data.alt);
</script>

<img src={blankImg} data-src={data.src} class={data.className} {alt} use:lazyLoad />
<div class="image-container"></div>
