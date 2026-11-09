import { getCDN } from '$lib/nhapi';
import { getKomikPage, getKomikTitle } from '$lib/server/db/queries/komik';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const title = await getKomikTitle(Number(params.id));
	const image_cdn = await getCDN();
	return {
		title: title,
		streamed: {
			komikPromise: getKomikPage(Number(params.id))
		},
		image_cdn: image_cdn
	};
};
