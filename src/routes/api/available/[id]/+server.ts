import { checkOnlineKomik } from '$lib/server/db/queries/add-komik';
import type { RequestHandler } from '@sveltejs/kit';
import { json, error, isHttpError } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const komikId = Number(params.id);
		const available = await checkOnlineKomik(komikId);
		return json({ available }, { status: 200 });
	} catch (err) {
		if (isHttpError(err)) {
			throw err;
		}
		console.error('Unexpected error in POST /api/items:', err);
		error(500, 'An internal server error occurred.');
	}
};
