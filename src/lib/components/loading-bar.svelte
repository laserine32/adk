<script lang="ts">
	import { page } from '$app/state';

	let progress = $state(0);
	let isLoading = $state(false);

	$effect(() => {
		// Membaca page.url dari $app/state akan membuat effect ini berjalan ulang (re-run)
		// setiap kali pathname atau search params berubah.
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const pathname = page.url.pathname;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const searchParams = page.url.searchParams.toString();

		let interval: ReturnType<typeof setInterval>;
		let timeout: ReturnType<typeof setTimeout>;

		const handleRouteChangeStart = () => {
			isLoading = true;
			progress = 0;

			if (interval) clearInterval(interval);

			interval = setInterval(() => {
				progress = progress >= 90 ? progress : progress + 10;
				if (progress >= 90) {
					clearInterval(interval);
				}
			}, 100);
		};

		const handleRouteChangeComplete = () => {
			progress = 100;
			setTimeout(() => {
				isLoading = false;
			}, 300);
		};

		// Menggunakan NodeListOf<Element> untuk TypeScript typing
		const linkingElements: NodeListOf<Element> = document.querySelectorAll('.linking');

		const attachListeners = () => {
			linkingElements.forEach((element) => {
				element.addEventListener('click', handleRouteChangeStart);
			});
		};

		const detachListeners = () => {
			linkingElements.forEach((element) => {
				element.removeEventListener('click', handleRouteChangeStart);
			});
		};

		attachListeners();
		handleRouteChangeStart();
		timeout = setTimeout(handleRouteChangeComplete, 1000);

		// Cleanup function
		return () => {
			detachListeners();
			clearInterval(interval);
			clearTimeout(timeout);
		};
	});
</script>

{#if isLoading}
	<div class="fixed top-0 left-0 z-50 h-1 w-full">
		<div
			class="h-full bg-blue-500 transition-all duration-300 ease-in-out"
			style="width: {progress}%"
		></div>
	</div>
{/if}
