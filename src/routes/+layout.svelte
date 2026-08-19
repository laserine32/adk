<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico';
	import Navbar from '$lib/components/navbar.svelte';
	import LoadingBar from '$lib/components/loading-bar.svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	let pageTitle = $derived($page.data.title);
	let finalTitle = $derived(pageTitle ? `${pageTitle} | ADK` : 'ADK');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{finalTitle}</title>
	<meta name="description" content="Read Comics Online" />

	<!-- OpenGraph -->
	<meta property="og:site_name" content="ADK" />
	<meta property="og:title" content={finalTitle} />
	<meta property="og:description" content="Read Comics Online" />
	<meta property="og:locale" content="id_ID" />
	<meta property="og:type" content="website" />

	<!-- Images -->
	<meta property="og:image" content={favicon} />
	<meta property="og:image:width" content="1366" />
	<meta property="og:image:height" content="396" />
	<meta property="og:image:alt" content="ADK logo" />
</svelte:head>
<LoadingBar />
<Navbar />
<div class="min-h-screen px-2 py-4 md:px-10">
	{@render children()}
</div>
<div class="mt-20 h-72 border-t border-dialect"></div>
