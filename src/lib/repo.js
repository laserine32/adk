import DataModel from "./DataModel"
import prisma from "./prisma"

export const komikModel = new DataModel(prisma.komik, "manga", {
	orderBy: [
		{
			date: "desc",
		},
	],
	searh_config: [
		{
			title: {
				contains: "",
				mode: "insensitive",
			},
		},
	],
})
export const pageModel = new DataModel(prisma.komik, "komik_pages", {
	include: {
		tags: { include: { tags: true }, orderBy: { tags: { type: "asc" } } },
		pages: true,
	},
	orderBy: [
		{
			Pages: {
				num: "asc",
			},
		},
	],
})
pageModel.getPageData = async function (id) {
	const rawData = await this.get(id)
	const dataAllChapter = await this.tbl.findMany({
		select: {
			id: true,
		},
		orderBy: [
			{
				date: "desc",
			},
		],
	})
	const allChapter = dataAllChapter.map((e) => ({ ...e, link: `/view/${e.id}` }))
	const index = allChapter.findIndex((e) => e.id === id)
	const prev = index === 0 ? "" : allChapter[index - 1].link
	const next = index === allChapter.length - 1 ? "" : allChapter[index + 1].link
	return {
		data: rawData,
		nav: { prev, next, current: id, list: "/" },
	}
}

export const tagsModel = new DataModel(prisma.tags, "tags", {})
export const tagsKomikModel = new DataModel(prisma.TagsOnKomik, "TagsOnKomik", {})
