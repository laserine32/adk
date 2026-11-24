import { getCDN } from '$lib/nhapi';
import { getGallery } from '$lib/nhapi';
import { addKomikApi, checkOnlineKomik, type KomikAddApi } from '$lib/server/db/queries/add-komik';
import type { RequestHandler } from '@sveltejs/kit';
import { json, error, isHttpError } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const komikId = Number(params.id);
		const komik = await getGallery(komikId);
		const { image_servers, thumb_servers } = await getCDN();
		if (komik.id === 0) {
			error(500, 'Cant get data komik from API');
		}
		const parcel: KomikAddApi = {
			komik: {
				id: komik.id,
				title: komik.title.english,
				japaneseTitle: komik.title.japanese,
				prettyTitle: komik.title.pretty,
				images: toBase64(JSON.stringify(komik)),
				cover: `${thumb_servers[0]}/${komik.cover.path}`,
				uploadDate: komik.upload_date,
				numPages: komik.num_pages,
				numFavorites: komik.num_favorites,
				numId: 0
			},
			pages: komik.pages.map((e) => ({
				id: genIdPage(`${komik.id}`, `${e.number}`),
				komikId: komik.id,
				img: `${image_servers[0]}/${e.path}`,
				num: e.number,
				newImg: ''
			})),
			tags: komik.tags.map((e) => ({
				id: e.id,
				type: e.type,
				name: e.name
			})),
			tagsOnKomik: komik.tags.map((e) => ({
				komikId: komik.id,
				tagsId: e.id
			}))
		};
		const available = await checkOnlineKomik(komikId);
		if (available) {
			return json({ success: available }, { status: 200 });
		}
		const result = await addKomikApi(parcel);
		if (result === false) {
			error(500, { message: `Failed to add Komik` });
		}
		return json({ success: result }, { status: 200 });
	} catch (err) {
		if (isHttpError(err)) {
			throw err;
		}
		console.error('Unexpected error in POST /api/items:', err);
		error(500, 'An internal server error occurred.');
	}
};

const toBase64 = (text: string) => {
	const utf8Bytes = new TextEncoder().encode(text);
	const binaryString = String.fromCharCode(...utf8Bytes);
	return btoa(binaryString);
};

const genIdPage = (idkomik: string, num: string) => {
	return `${idkomik}${num.padStart(4, '0')}`;
};
