import { getCDN, type CDNType } from '$lib/nhapi';
import { getKomikgetSearchPagin, getKomikTotalPage } from '$lib/server/db/queries/komik';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('s') || '';
	const currentPage = Number(url.searchParams.get('page')) || 1;
	const data = await getKomikgetSearchPagin(query, currentPage);
	const totalPage = await getKomikTotalPage(query);
	const image_cdn: CDNType = await getCDN();
	return {
		komik: data,
		totalPage: totalPage,
		image_cdn: image_cdn
	};
};
