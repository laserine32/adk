'use server';
import { desc, eq, sql } from 'drizzle-orm';
import { db } from '..';
import { komik, pages, tags, tagsOnKomik } from '../schema';

export type KomikAddApi = {
	komik: typeof komik.$inferInsert;
	pages: typeof pages.$inferInsert;
	tags: typeof tags.$inferInsert;
	tagsOnKomik: typeof tagsOnKomik.$inferInsert;
};

async function getAndValidateNumId() {
	const [{ data }] = await db
		.select({ data: komik.numId })
		.from(komik)
		.orderBy(desc(komik.numId))
		.limit(1);
	// const numId = async (n: number) => {
	// 	for (let nn = n; nn <= n + 100; nn++) {
	// 		const check = await db.$count(komik, eq(komik.numId, n + nn));
	// 		if (check == 0) {
	// 			return nn;
	// 		}
	// 	}
	// 	return n;
	// };
	// return await numId(data);
	return data + 1;
}

async function insertKomik(data: typeof komik.$inferInsert) {
	// const check = await db.$count(komik, eq(komik.id, data.id));
	// if(check > 0){
	//   throw new Error(`The Komik has already been saved.`);
	// }
	data.numId = await getAndValidateNumId();
	await db.insert(komik).values(data).onConflictDoNothing();
	await db.execute(sql`
    WITH RankedKomik AS (
      SELECT 
        id,
        ROW_NUMBER() OVER (ORDER BY date ASC) AS new_num_id
      FROM "Komik"
    )
    UPDATE "Komik"
    SET num_id = RankedKomik.new_num_id
    FROM RankedKomik
    WHERE "Komik".id = RankedKomik.id;
  `);
}

export async function addKomikApi(data: KomikAddApi): Promise<boolean> {
	try {
		// const { komik, pages, tags, tagsOnKomik } = data
		await insertKomik(data.komik);
		await db.insert(pages).values(data.pages).onConflictDoNothing();
		await db.insert(tags).values(data.tags).onConflictDoNothing();
		await db.insert(tagsOnKomik).values(data.tagsOnKomik).onConflictDoNothing();
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function checkOnlineKomik(id: number): Promise<boolean> {
	const check = await db.$count(komik, eq(komik.id, id));
	return check > 0;
}
