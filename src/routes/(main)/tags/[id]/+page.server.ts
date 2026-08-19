import type { PageServerLoad } from './$types';
import { getTags } from '$lib/server/db/queries/tags';
import { getKomikTaggetSearchPagin, getKomikTagTotalPage } from '$lib/server/db/queries/komik';
import { getCDN, type CDNType } from '$lib/nhapi';

export const load: PageServerLoad = async ({ url, params }) => {
	const query = url.searchParams.get('s') || '';
	const currentPage = Number(url.searchParams.get('page')) || 1;
	const tag = await getTags(Number(params.id));
	const data = await getKomikTaggetSearchPagin(Number(params.id), query, currentPage);
	const totalPage = await getKomikTagTotalPage(Number(params.id), query);
	const image_cdn: CDNType = await getCDN();
	console.log(tag);
	return {
		title: tag.name,
		tag: tag,
		komik: data,
		totalPage: totalPage,
		image_cdn: image_cdn
	};
};
