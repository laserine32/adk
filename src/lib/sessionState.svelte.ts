import { browser } from '$app/environment'; // Use `typeof window !== 'undefined'` if not using SvelteKit

export class SessionState<T> {
	value = $state<T>() as T;
	#key: string;

	constructor(key: string, initial: T) {
		this.#key = key;
		this.value = initial;

		if (browser) {
			const saved = sessionStorage.getItem(key);
			if (saved !== null) {
				this.value = JSON.parse(saved);
			}

			$effect.root(() => {
				$effect(() => {
					sessionStorage.setItem(this.#key, JSON.stringify(this.value));
				});
			});
		}
	}
}
