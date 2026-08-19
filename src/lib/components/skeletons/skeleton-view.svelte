<script>
	import Skeleton from './skeleton.svelte';
</script>

<div class="my-4 grid grid-cols-1 gap-4 rounded bg-border p-4 md:grid-cols-5">
	<div class="flex items-center justify-center md:col-span-2">
		<Skeleton className="w-3xs h-96" />
	</div>
	<div class="md:col-span-3">
		<Skeleton className="w-full h-5 mb-2" />
		<Skeleton className="w-5/6 h-5 mb-2" />
		<Skeleton className="w-4/6 h-5 mb-2" />
		<Skeleton className="w-5/6 h-5 my-6" />
		<div class="my-4 flex gap-2">
			<Skeleton className="w-10 h-5" />
			<Skeleton className="w-10 h-5" />
			<Skeleton className="w-10 h-5" />
			<Skeleton className="w-10 h-5" />
		</div>
	</div>
</div>
<Skeleton className="w-full h-screen" />
<Skeleton className="w-full h-screen" />
