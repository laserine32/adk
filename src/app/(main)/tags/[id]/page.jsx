import ChapterList from "@/components/shared/chapter-list"
import Pagination from "@/components/shared/pagination"
import SkeletonKomik from "@/components/shared/skeleton-komik"
import { komikModel, tagsModel } from "@/lib/repo"
import { FireIcon } from "@heroicons/react/24/solid"
import { Suspense } from "react"

export const generateMetadata = async ({ params }) => {
	const { id } = await params
	const data = await tagsModel.get(Number(id))
	const title = data.name
	return {
		title: `${title}`,
	}
}

const TagsPageId = async ({ params, searchParams }) => {
	const csp = await searchParams
	const { id } = await params
	const tag = await tagsModel.get(Number(id))
	const query = csp?.query || ""
	const currentPage = Number(csp?.page) || 1
	const where = { tags: { some: { tags: { id: Number(id) } } } }
	const data = await komikModel.getSearchPaginWhere(where, query, currentPage, {})
	const totalPage = await komikModel.getPageWhere(where, query)
	console.log(query)
	return (
		<>
			<div className="flex justify-center items-center gap-4">
				<FireIcon className="w-6 text-red-500" />
				<h1 className="text-2xl font-bold">{tag.name}</h1>
			</div>
			<div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
				<Suspense key={query + currentPage} fallback={<SkeletonKomik />}>
					<ChapterList data={data} />
				</Suspense>
			</div>
			<div className="flex justify-center mt-4">
				<Pagination totalPages={totalPage} />
			</div>
		</>
	)
}

export default TagsPageId
