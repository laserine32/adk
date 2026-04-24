import React, { JSX, Suspense } from "react";
import Pagination from "@/components/pagination";
import SkeletonKomik from "@/components/skeleton-komik";
import { FireIcon } from "@heroicons/react/24/solid";
import { getMainPage } from "@/lib/nhapi";
import ChapterListOnline from "@/components/chapter-list-online";

export const revalidate = 3600;

type SearchParams = {
	query?: string;
	page?: string;
};

type HomeProps = {
	searchParams: Promise<SearchParams | undefined> | SearchParams | undefined;
};

const OnlinePage = async ({ searchParams }: HomeProps): Promise<JSX.Element> => {
  const csp = await searchParams
	const query = csp?.query || ""
	const currentPage = Number(csp?.page) || 1
  const data = await getMainPage(currentPage)
  const totalPage = data.num_pages
  return (
    <>
			<div className="flex justify-center items-center gap-4">
				<FireIcon className="w-6 text-red-500" />
				<h1 className="text-2xl font-bold">Online</h1>
			</div>
			<div className="my-8 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
				<Suspense key={query + currentPage} fallback={<SkeletonKomik />}>
          <ChapterListOnline data={data} />
				</Suspense>
			</div>
			<div className="flex justify-center my-28">
				<Pagination totalPages={totalPage} />
			</div>
		</>
  )
}

export default OnlinePage