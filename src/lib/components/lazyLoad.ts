export function lazyLoad(node: HTMLImageElement): { destroy: () => void } {
	const observer: IntersectionObserver = new IntersectionObserver(
		(entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry: IntersectionObserverEntry) => {
				if (entry.isIntersecting) {
					const src: string | undefined = node.dataset.src;
					if (src !== undefined) {
						node.src = src;
					}
					node.classList.add('loaded');
					observer.unobserve(node);
				}
			});
		},
		{
			rootMargin: '200px'
			// rootMargin: '5000px 0px'
		} satisfies IntersectionObserverInit
	);

	observer.observe(node);

	return {
		destroy(): void {
			observer.disconnect();
		}
	};
}
