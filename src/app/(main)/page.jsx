import ChapterList from "@/components/shared/chapter-list"
import Pagination from "@/components/shared/pagination"
import SkeletonKomik from "@/components/shared/skeleton-komik"
import { komikModel } from "@/lib/repo"
import { FireIcon } from "@heroicons/react/24/solid"
import { Suspense } from "react"

const Home = async ({ searchParams }) => {
	const csp = await searchParams
	const query = csp?.query || ""
	const currentPage = Number(csp?.page) || 1
	const data = await komikModel.getSearchPagin(query, currentPage)
	const totalPage = await komikModel.getPage(query)
	return (
		<>
			<div className="flex justify-center items-center gap-4">
				<FireIcon className="w-6 text-red-500" />
				<h1 className="text-2xl font-bold">Home</h1>
			</div>
			<div className="my-8 grid grid-cols-3 gap-4 md:grid-cols-6 md:gap-6">
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

export default Home
