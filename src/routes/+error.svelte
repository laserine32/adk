<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<div class="px-2 py-4 md:px-10">
	<div class="flex flex-col items-center justify-center py-20 text-sm max-md:px-4">
		{#if page.status === 404}
			<h1
				class="bg-linear-to-r from-white to-gray-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
			>
				404 Not Found
			</h1>
			<div class="my-5 h-px w-80 rounded bg-linear-to-r from-gray-400 to-gray-800 md:my-7"></div>
			<p class="max-w-lg text-center text-gray-400 md:text-xl">
				The page you are looking for does not exist or has been moved.
			</p>
		{:else}
			<h1
				class="bg-linear-to-r from-white to-gray-500 bg-clip-text text-4xl font-bold text-transparent"
			>
				Error {page.status}
			</h1>
			<div class="my-5 h-px w-80 rounded bg-linear-to-r from-gray-400 to-gray-800 md:my-7"></div>
			<p class="max-w-lg text-center text-gray-400 md:text-xl">{page.error?.message}</p>
		{/if}
		<a
			href={resolve('/')}
			class="group mt-10 flex items-center gap-1 rounded-full bg-white px-7 py-2.5 font-medium text-gray-800 transition-all hover:bg-gray-200 active:scale-95"
			>Go back home</a
		>
	</div>
</div>
