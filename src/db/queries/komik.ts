import { db } from "@/db";
import { komik, pages, tags, tagsOnKomik } from "@/db/schema";
import { ilike, desc, count, eq, inArray, and, getTableColumns } from "drizzle-orm";
import { ITEMS_PER_PAGE } from "@/lib/constants";

export type KomikType = typeof komik.$inferSelect;

export type TagsMinType = {
	id: number;
	name: string;
	type: string;
};

export type KomikWithTag = KomikType & {
	tag: string | null;
};

export async function getKomikgetSearchPagin(query: string, page: number = 1) {
	const offset = (page - 1) * ITEMS_PER_PAGE;

	const where = query ? ilike(komik.title, `%${query}%`) : undefined;
	const data = await db
		.select()
		.from(komik)
		.where(where)
		.orderBy(desc(komik.date))
		.limit(ITEMS_PER_PAGE)
		.offset(offset);

	const komikIds = data.map((k) => k.id);
	const tagsData = await db
		.select({
			komikId: tagsOnKomik.komikId,
			type: tags.type,
			name: tags.name,
		})
		.from(tagsOnKomik)
		.leftJoin(tags, eq(tagsOnKomik.tagsId, tags.id))
		.where(and(inArray(tagsOnKomik.komikId, komikIds), inArray(tags.type, ["artist", "group"])));

	const tagMap = new Map<number, string | null>();
	for (const row of tagsData) {
		const existing = tagMap.get(row.komikId);

		if (!existing) {
			if (row.type === "artist") {
				tagMap.set(row.komikId, row.name);
				continue;
			}
			if (row.type === "group") {
				tagMap.set(row.komikId, row.name);
				continue;
			}
		}
	}

	const result: KomikWithTag[] = data.map((k) => ({
		...k,
		tag: tagMap.get(k.id) ?? null,
	}));
	return result;
}

export type KomikgetSearchPagin = Awaited<ReturnType<typeof getKomikgetSearchPagin>>;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getKomikTotalPage(query: string): Promise<number> {
	const where = query ? ilike(komik.title, `%${query}%`) : undefined;

	const result = await db.select({ total: count() }).from(komik).where(where);

	const total = Number(result[0]?.total ?? 0);

	return Math.ceil(total / ITEMS_PER_PAGE);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getKomikTaggetSearchPagin(tagId: number, query: string, page: number = 1) {
	const offset = (page - 1) * ITEMS_PER_PAGE;

	const whereTag = tagId ? eq(tagsOnKomik.tagsId, tagId) : undefined;
	const where = query ? ilike(komik.title, `%${query}%`) : undefined;
	const rawdata = await db
		.select({ komik })
		.from(komik)
		.leftJoin(tagsOnKomik, eq(tagsOnKomik.komikId, komik.id))
		.where(and(where, whereTag))
		.orderBy(desc(komik.date))
		.limit(ITEMS_PER_PAGE)
		.offset(offset);

	const data = rawdata.map((k) => k.komik);
	const komikIds = data.map((k) => k.id);
	const tagsData = await db
		.select({
			komikId: tagsOnKomik.komikId,
			type: tags.type,
			name: tags.name,
		})
		.from(tagsOnKomik)
		.leftJoin(tags, eq(tagsOnKomik.tagsId, tags.id))
		.where(and(inArray(tagsOnKomik.komikId, komikIds), inArray(tags.type, ["artist", "group"])));

	const tagMap = new Map<number, string | null>();
	for (const row of tagsData) {
		const existing = tagMap.get(row.komikId);

		if (!existing || row.type === "artist") {
			tagMap.set(row.komikId, row.name);
		}
	}

	const result: KomikWithTag[] = data.map((k) => ({
		...k,
		tag: tagMap.get(k.id) ?? null,
	}));
	return result;
}

export async function getKomikTagTotalPage(tagId: number, query: string): Promise<number> {
	const whereTag = tagId ? eq(tagsOnKomik.tagsId, tagId) : undefined;
	const where = query ? ilike(komik.title, `%${query}%`) : undefined;

	const result = await db
		.select({ total: count() })
		.from(komik)
		.leftJoin(tagsOnKomik, eq(tagsOnKomik.komikId, komik.id))
		.where(and(whereTag, where));

	const total = Number(result[0]?.total ?? 0);

	return Math.ceil(total / ITEMS_PER_PAGE);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getKomik(id: number) {
	const [data] = await db.select().from(komik).where(eq(komik.id, id));
	return data;
}

type PagesMinType = {
	id: string;
	img: string;
	num: number;
};

type KomikWithPage = {
	id: number;
	title: string;
	prettyTitle: string;
	japaneseTitle: string;
	date: string;
	cover: string;
	numPages: number;
	tags: TagsMinType[];
	pages: PagesMinType[];
} | null;

export async function getRawKomikPage(id: number) {
	const rows = await db
		.select({
			komik,
			tag: tags,
			pages,
		})
		.from(komik)
		.leftJoin(pages, eq(pages.komikId, komik.id))
		.leftJoin(tagsOnKomik, eq(tagsOnKomik.komikId, komik.id))
		.leftJoin(tags, eq(tags.id, tagsOnKomik.tagsId))
		.where(eq(komik.id, id))
		.orderBy(pages.num);

	const map = new Map<number, KomikWithPage>();
	const dataTags: TagsMinType[] = [];
	const dataPages: PagesMinType[] = [];
	for (const row of rows) {
		const k = row.komik;
		const t = row.tag;
		const p = row.pages;
		if (!map.has(k.id)) {
			map.set(k.id, {
				id: k.id,
				title: k.title,
				prettyTitle: k.prettyTitle,
				japaneseTitle: k.japaneseTitle,
				date: k.date,
				cover: k.cover,
				numPages: k.numPages,
				tags: [],
				pages: [],
			});
		}
		if (t) {
			const found = dataTags.findIndex((e) => e.id === t.id);
			if (found == -1) {
				const tmpt = {
					id: t.id,
					name: t.name,
					type: t.type,
				};
				dataTags.push(tmpt);
				map.get(id)!.tags.push(tmpt);
			}
		}
		if (p) {
			const found = dataPages.findIndex((e) => e.id === p.id);
			if (found == -1) {
				const tmpp = {
					id: p.id,
					img: p.img,
					num: p.num,
				};
				dataPages.push(tmpp);
				map.get(k.id)!.pages.push(tmpp);
			}
		}
	}
	return Array.from(map.values());
}

////////////////////////////////////////////////////////////////////////////////

export type NavKomikPage = {
	prev: string;
	next: string;
	current: string;
	list: string;
} | null;

export type KomikPage = {
	data: KomikWithPage;
	nav: NavKomikPage;
};

export async function getKomikPageTag(id: number, tagId: number = -1): Promise<KomikPage> {
	const mainWhere = tagId > 0 ? eq(tagsOnKomik.tagsId, tagId) : undefined;
	const data = await db
		.select({
			...getTableColumns(komik),
		})
		.from(komik)
		.leftJoin(tagsOnKomik, eq(tagsOnKomik.komikId, komik.id))
		.where(mainWhere)
		.orderBy(desc(komik.numId));

	const tagLinkAddon = tagId > 0 ? `/tags/${tagId}` : "";
	const allChapter = data.map((e) => ({ ...e, link: `${tagLinkAddon}/view/${e.id}` }));
	const index = allChapter.findIndex((e) => e.id === id);
	const prev = index === 0 ? "" : allChapter[index - 1].link;
	const next = index === allChapter.length - 1 ? "" : allChapter[index + 1].link;

	const dataTags: TagsMinType[] = await db
		.select({
			id: tags.id,
			name: tags.name,
			type: tags.type,
		})
		.from(tags)
		.leftJoin(tagsOnKomik, eq(tagsOnKomik.tagsId, tags.id))
		.where(eq(tagsOnKomik.komikId, id));

	const dataPages: PagesMinType[] = await db
		.select({
			id: pages.id,
			img: pages.img,
			num: pages.num,
		})
		.from(pages)
		.where(eq(pages.komikId, id))
		.orderBy(pages.num);

	const inikomik = data[index];
	const komikData: KomikWithPage = {
		id: inikomik.id,
		title: inikomik.title,
		prettyTitle: inikomik.prettyTitle,
		japaneseTitle: inikomik.japaneseTitle,
		date: inikomik.date,
		cover: inikomik.cover,
		numPages: inikomik.numPages,
		tags: dataTags,
		pages: dataPages,
	};

	return {
		data: komikData,
		nav: { prev, next, current: `${id}`, list: tagId > 0 ? `/tags/${tagId}` : "/" },
	};
}

async function getNavKomik(num_id: number) {
	const [data] = await db.select().from(komik).where(eq(komik.numId, num_id)).orderBy(desc(komik.numId));
	if (!data) {
		return "";
	}
	return `/view/${data.id}`;
}

export async function getKomikPage(id: number): Promise<KomikPage> {
	const [data] = await db.select().from(komik).where(eq(komik.id, id)).orderBy(desc(komik.numId));
	if (!data) {
		return {
			data: null,
			nav: null,
		};
	}

	const num_id = data.numId;
	const num_prev = num_id + 1;
	const num_next = num_id - 1;

	const prev = await getNavKomik(num_prev);
	const next = await getNavKomik(num_next);

	const dataTags: TagsMinType[] = await db
		.select({
			id: tags.id,
			name: tags.name,
			type: tags.type,
		})
		.from(tags)
		.leftJoin(tagsOnKomik, eq(tagsOnKomik.tagsId, tags.id))
		.where(eq(tagsOnKomik.komikId, id));

	const dataPages: PagesMinType[] = await db
		.select({
			id: pages.id,
			img: pages.img,
			num: pages.num,
		})
		.from(pages)
		.where(eq(pages.komikId, id))
		.orderBy(pages.num);

	const inikomik = data;
	const komikData: KomikWithPage = {
		id: inikomik.id,
		title: inikomik.title,
		prettyTitle: inikomik.prettyTitle,
		japaneseTitle: inikomik.japaneseTitle,
		date: inikomik.date,
		cover: inikomik.cover,
		numPages: inikomik.numPages,
		tags: dataTags,
		pages: dataPages,
	};

	return {
		data: komikData,
		nav: { prev, next, current: `${id}`, list: "/" },
	};
}
