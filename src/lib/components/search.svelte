<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import MagnifyingGlassIcon from './icons/MagnifyingGlassIcon.svelte';
	import XMarkIcon from './icons/XMarkIcon.svelte';

	let pathname: string = $derived(page.url.pathname);
	let search_query = $derived(page.url.searchParams.get('s') || '');
	// let search = $state('');
	function handleSubmit(event: Event) {
		event.preventDefault();
		goto(resolve(`/${pathname}?s=${search_query}` as `/`));
	}
	function handleClear() {
		goto(resolve(`${pathname}` as `/`));
	}
</script>

<form
	onsubmit={handleSubmit}
	class="flex rounded-md border border-zinc-700 bg-zinc-800 text-sm text-white shadow"
>
	<div aria-disabled="true" class="grid w-10 place-content-center">
		<MagnifyingGlassIcon />
	</div>
	<input
		type="text"
		spellCheck="false"
		name="text"
		class="w-20 bg-transparent py-1.5 transition-all outline-none placeholder:text-zinc-400 focus:w-48"
		placeholder="Search..."
		bind:value={search_query}
	/>
	{#if search_query != ''}
		<button
			onclick={handleClear}
			class="grid w-10 place-content-center"
			aria-label="Clear input button"
			type="reset"
		>
			<XMarkIcon />
		</button>
	{/if}
</form>
