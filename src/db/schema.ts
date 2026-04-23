import { pgTable, timestamp, text, integer, foreignKey, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const tags = pgTable("Tags", {
	id: integer().primaryKey().notNull(),
	type: text().notNull(),
	name: text().notNull(),
});

export const komik = pgTable("Komik", {
	id: integer().primaryKey().notNull(),
	title: text().default('').notNull(),
	japaneseTitle: text("japanese_title").default('').notNull(),
	prettyTitle: text("pretty_title").default('').notNull(),
	images: text().default('').notNull(),
	uploadDate: integer("upload_date").default(0).notNull(),
	numPages: integer("num_pages").default(0).notNull(),
	numFavorites: integer("num_favorites").default(0).notNull(),
	cover: text().default('').notNull(),
	date: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	numId: integer("num_id").default(0).notNull(),
});

export const pages = pgTable("Pages", {
  id: text().primaryKey().notNull(),
  komikId: integer().notNull(),
  img: text().notNull(),
  num: integer().notNull(),
}, (table) => [
  foreignKey({
      columns: [table.komikId],
      foreignColumns: [komik.id],
      name: "Pages_komikId_fkey"
    }).onUpdate("cascade").onDelete("restrict"),
]);

export const tagsOnKomik = pgTable("TagsOnKomik", {
  komikId: integer().notNull(),
  tagsId: integer().notNull(),
}, (table) => [
  foreignKey({
      columns: [table.komikId],
      foreignColumns: [komik.id],
      name: "TagsOnKomik_komikId_fkey"
    }).onUpdate("cascade").onDelete("restrict"),
  foreignKey({
      columns: [table.tagsId],
      foreignColumns: [tags.id],
      name: "TagsOnKomik_tagsId_fkey"
    }).onUpdate("cascade").onDelete("restrict"),
  primaryKey({ columns: [table.komikId, table.tagsId], name: "TagsOnKomik_pkey"}),
]);