import { getKomikPageTag, getKomikTagTitle } from '$lib/server/db/queries/komik';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const title = await getKomikTagTitle(Number(params.id), Number(params.komikId));
	return {
		title: title,
		streamed: {
			komikPromise: getKomikPageTag(Number(params.komikId), Number(params.id))
		}
	};
};
