<script lang="ts">
	import blankImg from '$lib/assets/blank.svg';
	import { lazyLoad } from './lazyLoad';

	type LazyImageProps = {
		src: string;
		fallback?: string;
		className?: string;
		alt?: string;
	};

	const data: LazyImageProps = $props();
	let alt = $derived(data.alt);

	let stage = 0;

	const toRawGithub = (url: string): string | null => {
		const match = url.match(/^https:\/\/cdn\.jsdelivr\.net\/gh\/([^/]+)\/([^@/]+)@([^/]+)\/(.+)$/);
		if (!match) return null;
		const [, user, repo, branch, path] = match;
		return `https://raw.githubusercontent.com/${user}/${repo}/refs/heads/${branch}/${path}`;
	};

	const handleError = (e: Event) => {
		const img = e.currentTarget as HTMLImageElement;

		while (stage < 3) {
			stage++;
			const next = stage === 1 ? toRawGithub(data.src) : stage === 2 ? data.fallback : blankImg;

			if (next) {
				img.src = next;
				return;
			}
		}
	};
</script>

<img
	src={blankImg}
	data-src={data.src}
	class={data.className}
	{alt}
	onerror={handleError}
	use:lazyLoad
/>
<!-- <div class="image-container"></div> -->
