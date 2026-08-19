import type { CDNType } from '$lib/nhapi';
import { getCDN } from '$lib/nhapi';
import { getKomikPageTag } from '$lib/server/db/queries/komik';
import { getKomik } from '$lib/server/db/queries/komik';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const komik = await getKomik(Number(params.komikId));
	const data = await getKomikPageTag(Number(params.komikId), Number(params.id));
	const image_cdn: CDNType = await getCDN();
	return {
		title: komik?.title ?? `Not Found`,
		dataKomik: data,
		image_cdn: image_cdn
	};
};
