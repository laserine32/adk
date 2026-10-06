import { getKomikPage, getKomikTitle } from '$lib/server/db/queries/komik';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const title = await getKomikTitle(Number(params.id));
	return {
		title: title,
		streamed: {
			komikPromise: getKomikPage(Number(params.id))
		}
	};
};
