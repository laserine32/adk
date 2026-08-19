import type { onlineSortType } from '$lib/nhapi';
import type { CDNType } from '$lib/nhapi';
import { getPageByTag } from '$lib/nhapi';
import { getOnlineTag } from '$lib/nhapi';
import { getCDN } from '$lib/nhapi';
import { capitalizeFirstLetter } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, params }) => {
	const currentPage = Number(url.searchParams.get('page')) || 1;
	const currentSort: onlineSortType = (url.searchParams.get('sort') as onlineSortType) || 'date';
	const [onlineTag] = await getOnlineTag(Number(params.id));
	const komik = await getPageByTag(Number(params.id), currentPage, currentSort);
	const image_cdn: CDNType = await getCDN();
	const totalPage = komik.num_pages ?? 0;
	return {
		title: `${capitalizeFirstLetter(onlineTag.type) ?? ''}: ${capitalizeFirstLetter(onlineTag.name) ?? ''}`,
		onlineTag,
		komik,
		totalPage,
		image_cdn
	};
};
