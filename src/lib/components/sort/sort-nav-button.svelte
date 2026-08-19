<script lang="ts">
	import { resolve } from '$app/paths';
	import { cn } from '$lib/utils';

	type NavButtonPropsType = {
		text: string;
		position: 'first' | 'middle' | 'last' | 'single' | undefined;
		href: string;
		isActive: boolean;
	};
	const { text, position, href, isActive }: NavButtonPropsType = $props();
</script>

<div
	class={cn('linking flex items-center justify-center border border-input p-2', {
		'rounded-l-sm': position === 'first' || position === 'single',
		'rounded-r-sm': position === 'last' || position === 'single',
		'boder-border z-10 bg-input text-primary-foreground': isActive,
		'hover:bg-input hover:text-primary-foreground': !isActive
	})}
>
	<a href={resolve(href as '/')}>{text}</a>
</div>
