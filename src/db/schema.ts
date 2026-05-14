import { pgTable, timestamp, text, integer, foreignKey, index, primaryKey } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm/relations";

export const tags = pgTable("Tags", {
	id: integer().primaryKey().notNull(),
	type: text().notNull(),
	name: text().notNull(),
});

export const komik = pgTable(
	"Komik",
	{
		id: integer().primaryKey().notNull(),
		title: text().default("").notNull(),
		japaneseTitle: text("japanese_title").default("").notNull(),
		prettyTitle: text("pretty_title").default("").notNull(),
		images: text().default("").notNull(),
		uploadDate: integer("upload_date").default(0).notNull(),
		numPages: integer("num_pages").default(0).notNull(),
		numFavorites: integer("num_favorites").default(0).notNull(),
		cover: text().default("").notNull(),
		date: timestamp({ precision: 3, mode: "string" })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		numId: integer("num_id").default(0).notNull(),
	},
	(table) => [index("idx_komik_title_trgm").using("gin", table.title.asc().nullsLast().op("gin_trgm_ops"))],
);

export const pages = pgTable(
	"Pages",
	{
		id: text().primaryKey().notNull(),
		komikId: integer().notNull(),
		img: text().notNull(),
		num: integer().notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.komikId],
			foreignColumns: [komik.id],
			name: "Pages_komikId_fkey",
		})
			.onUpdate("cascade")
			.onDelete("restrict"),
	],
);

export const tagsOnKomik = pgTable(
	"TagsOnKomik",
	{
		komikId: integer().notNull(),
		tagsId: integer().notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.komikId],
			foreignColumns: [komik.id],
			name: "TagsOnKomik_komikId_fkey",
		})
			.onUpdate("cascade")
			.onDelete("restrict"),
		foreignKey({
			columns: [table.tagsId],
			foreignColumns: [tags.id],
			name: "TagsOnKomik_tagsId_fkey",
		})
			.onUpdate("cascade")
			.onDelete("restrict"),
		primaryKey({ columns: [table.komikId, table.tagsId], name: "TagsOnKomik_pkey" }),
	],
);

export const pagesRelations = relations(pages, ({ one }) => ({
	komik: one(komik, {
		fields: [pages.komikId],
		references: [komik.id],
	}),
}));

export const komikRelations = relations(komik, ({ many }) => ({
	pages: many(pages),
	tagsOnKomiks: many(tagsOnKomik),
}));

export const tagsOnKomikRelations = relations(tagsOnKomik, ({ one }) => ({
	komik: one(komik, {
		fields: [tagsOnKomik.komikId],
		references: [komik.id],
	}),
	tag: one(tags, {
		fields: [tagsOnKomik.tagsId],
		references: [tags.id],
	}),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
	tagsOnKomiks: many(tagsOnKomik),
}));
