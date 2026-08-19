import type { CDNType } from '$lib/nhapi';
import type { onlineSortType } from '$lib/nhapi';
import { getCDN } from '$lib/nhapi';
import { getMainPage } from '$lib/nhapi';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('s') || '';
	const currentPage = Number(url.searchParams.get('page')) || 1;
	const currentSort: onlineSortType = (url.searchParams.get('sort') as onlineSortType) || 'date';
	const komik = await getMainPage(currentPage, currentSort, query);
	const totalPage = komik.num_pages;
	const image_cdn: CDNType = await getCDN();
	return {
		title: 'Online',
		query,
		currentPage,
		currentSort,
		komik,
		totalPage,
		image_cdn
	};
};
