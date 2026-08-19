<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	import Search from './search.svelte';

	let pathname: string = $derived(page.url.pathname);

	type navigationItemType = {
		name: string;
		href: string;
		current: boolean;
	};
	let navigation: navigationItemType[] = [
		{ name: 'Home', href: '/', current: false },
		{ name: 'Tags', href: '/tags', current: false },
		{ name: 'Online', href: '/online', current: false }
	];

	let isOpen = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
	}
</script>

<nav class="bg-border">
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex items-center justify-between">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<button
					class="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
					id="headlessui-disclosure-button-_R_livb_"
					type="button"
					aria-expanded="false"
					onclick={toggleMenu}
				>
					<span class="absolute -inset-0.5"></span><span class="sr-only">Open main menu</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
						data-slot="icon"
						class="block size-6 group-data-open:hidden"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						></path>
					</svg>
				</button>
			</div>
			<div class="flex w-full flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex shrink-0 items-center py-2">
					<img
						alt="ADK"
						loading="eager"
						width="32"
						height="32"
						decoding="async"
						data-nimg="1"
						class="h-8 w-auto"
						style="color:transparent"
						src="/adk01.png"
					/>
				</div>
				<div class="hidden grow sm:ml-6 sm:block">
					<div class="flex">
						{#each navigation as item (item.name)}
							{@const itemcurrent = item.href == pathname}
							<a
								href={resolve(`${item.href}` as `/`)}
								aria-current={itemcurrent ? 'page' : undefined}
								class={cn(
									itemcurrent
										? 'bg-input text-white'
										: 'text-gray-300 hover:bg-input hover:text-white',
									'px-3 py-4 text-sm font-medium'
								)}
							>
								{item.name}
							</a>
						{/each}
					</div>
				</div>
				<div class="hidden py-2 sm:ml-6 sm:flex">
					<Search />
				</div>
			</div>
		</div>
	</div>
	<!--  -->
	<div class="sm:hidden">
		<!-- {isOpen ? 'open' : ''} -->
		<div class={cn(isOpen ? 'block' : 'hidden', 'space-y-1 px-2 pt-2 pb-3')}>
			{#each navigation as item (item.name)}
				<a
					href={resolve(`/${item.href}` as `/`)}
					aria-current={item.current ? 'page' : undefined}
					class={cn(
						item.current ? 'bg-input text-white' : 'text-gray-300 hover:bg-input hover:text-white',
						'block rounded-md px-3 py-2 text-base font-medium'
					)}
					onclick={() => (isOpen = false)}
				>
					{item.name}
				</a>
			{/each}
			<Search />
		</div>
	</div>
</nav>
