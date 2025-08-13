import DataModel from "./DataModel"
import prisma from "./prisma"

export const komikModel = new DataModel(prisma.komik, "manga", {
	include: {
		tags: { include: { tags: true }, orderBy: { tags: { type: "asc" } } },
	},
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
	try {
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
	} catch (error) {
		console.log(error.message)
		// throw new Error(`Failed to get '${this.name}' data.`)
		return {
			data: [],
			nav: {},
		}
	}
}

export const tagsModel = new DataModel(prisma.tags, "tags", {
	orderBy: [
		{
			name: "asc",
		},
	],
})
tagsModel.getForPage = async function () {
	const data = await this.getAll()
	const groupedByCategory = Object.groupBy(data, (e) => e.type)
	return groupedByCategory
}
export const tagsKomikModel = new DataModel(prisma.TagsOnKomik, "TagsOnKomik", {})
