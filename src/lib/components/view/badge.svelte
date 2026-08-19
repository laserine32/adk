<script lang="ts">
	interface badgeProps {
		text: string;
		count?: number;
	}
	const { text, count = -1 }: badgeProps = $props();
</script>

{#if count < 0}
	<div class="cursor-pointer rounded bg-input px-2 py-1 hover:bg-input/50">{text}</div>
{:else}
	<div class="group flex cursor-pointer justify-center">
		<div class="rounded-l bg-input px-2 py-1 group-hover:bg-input/50">{text}</div>
		<div class="rounded-r bg-input/50 px-2 py-1 group-hover:bg-input/40">{count}</div>
	</div>
{/if}
