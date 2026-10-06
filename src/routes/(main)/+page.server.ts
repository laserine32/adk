import { getKomikgetSearchPagin, getKomikTotalPage } from '$lib/server/db/queries/komik';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	const query = url.searchParams.get('s') || '';
	const currentPage = Number(url.searchParams.get('page')) || 1;
	return {
		streamed: {
			komikPromise: getKomikgetSearchPagin(query, currentPage),
			totalPagePromise: getKomikTotalPage(query)
		}
	};
};
