import type { NewTags } from '$lib/server/db/queries/tags';
import { getAllTagsCount } from '$lib/server/db/queries/tags';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const data: NewTags[] = await getAllTagsCount();
	return {
		title: 'Tags',
		dataTags: data
	};
};
