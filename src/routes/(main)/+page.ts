import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const STORAGE_KEY = 'main-page-number';

export const load: PageLoad = async ({ url, data }) => {
	const urlPage = url.searchParams.get('page');

	if (browser) {
		if (urlPage) {
			// 1. User navigated to a specific page (e.g. ?page=5) -> Save it
			sessionStorage.setItem(STORAGE_KEY, urlPage);
		} else {
			// 2. User returned to "/" with no ?page param -> Check sessionStorage
			const savedPage = sessionStorage.getItem(STORAGE_KEY);
			if (savedPage && savedPage !== '1') {
				throw redirect(307, `?page=${savedPage}`);
			}
		}
	}

	// Pass the server data from +page.server.ts straight through to +page.svelte
	return data;
};
