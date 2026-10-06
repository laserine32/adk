import type { PageServerLoad } from './$types';
import { getTags } from '$lib/server/db/queries/tags';
import { getKomikTaggetSearchPagin, getKomikTagTotalPage } from '$lib/server/db/queries/komik';

export const load: PageServerLoad = async ({ url, params }) => {
	const query = url.searchParams.get('s') || '';
	const currentPage = Number(url.searchParams.get('page')) || 1;
	const tag = await getTags(Number(params.id));
	return {
		title: tag.name,
		tag: tag,
		streamed: {
			komikPromise: getKomikTaggetSearchPagin(Number(params.id), query, currentPage),
			totalPagePromise: getKomikTagTotalPage(Number(params.id), query)
		}
	};
};
