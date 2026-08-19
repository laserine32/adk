import { count, eq } from 'drizzle-orm';
import { tags, tagsOnKomik } from '../schema';
import { db } from '..';

export type Tags = typeof tags.$inferSelect;
export type NewTags = {
	id: number;
	name: string;
	type: string;
	count: number;
};

export async function getAllTags() {
	return db.select().from(tags).orderBy(tags.name);
}

export type AllTags = Awaited<ReturnType<typeof getAllTags>>;

export function groupTags(data: AllTags | NewTags[]) {
	if (!data) return [];
	return Object.groupBy(data, (e) => e.type);
}

export type GroupTagsType = ReturnType<typeof groupTags>;

export async function getAllTagsCount() {
	return await db
		.select({
			id: tags.id,
			name: tags.name,
			type: tags.type,
			count: count()
		})
		.from(tags)
		.leftJoin(tagsOnKomik, eq(tagsOnKomik.tagsId, tags.id))
		.groupBy(tags.id)
		.orderBy(tags.name);
}

export const getTags = async (id: number): Promise<Tags> => {
	const [data] = await db
		.select({
			id: tags.id,
			name: tags.name,
			type: tags.type
		})
		.from(tags)
		.where(eq(tags.id, id));
	if (!data) {
		return {
			id: -1,
			type: 'Not Found',
			name: 'Not Found'
		};
	}
	return data;
};
