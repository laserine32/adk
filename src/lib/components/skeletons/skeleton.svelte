<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
		className?: string;
	};

	let { className, ...props }: SkeletonProps = $props();
</script>

<div class={cn('animate-pulse rounded-md bg-muted', className)} {...props}></div>
