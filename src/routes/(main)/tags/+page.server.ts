import { getAllTagsCount } from '$lib/server/db/queries/tags';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		title: 'Tags',
		streamed: {
			tagsPromise: getAllTagsCount()
		}
	};
};
