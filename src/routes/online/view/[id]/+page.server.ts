import type { CDNType } from '$lib/nhapi';
import { getRelated } from '$lib/nhapi';
import { getGallery } from '$lib/nhapi';
import { getCDN } from '$lib/nhapi';
import { addKomikApi, checkOnlineKomik, type KomikAddApi } from '$lib/server/db/queries/add-komik';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const komik = await getGallery(Number(params.id));
	const related = await getRelated(Number(params.id));
	const image_cdn: CDNType = await getCDN();
	const available = await checkOnlineKomik(Number(params.id));
	return {
		title: komik.title.english,
		komik,
		related,
		image_cdn,
		available
	};
};

export const actions: Actions = {
	submitData: async ({ request }) => {
		const data = await request.formData();
		const parcel = data.get('parcel');
		if (!parcel) {
			return fail(400, { message: 'Info tidak boleh kosong' });
		}
		const komik: KomikAddApi = JSON.parse(parcel as string) as KomikAddApi;
		if (!komik) {
			return fail(500, { message: 'Failed to parse komik' });
		}
		const result = await addKomikApi(komik);
		if (result === false) {
			return fail(500, { message: `Failed to add Komik` });
		}
		return { success: true, message: 'Data berhasil disimpan!' };
	}
};
