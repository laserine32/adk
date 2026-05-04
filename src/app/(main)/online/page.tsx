import React, { JSX, Suspense } from "react";
import Pagination from "@/components/pagination";
import SkeletonKomik from "@/components/skeleton-komik";
import { FireIcon } from "@heroicons/react/24/solid";
import { getMainPage, onlineSortType } from "@/lib/nhapi";
import ChapterListOnline from "@/components/chapter-list-online";
import SortOnline from "@/components/sort-online";

export const revalidate = 3600;

type SearchParams = {
	query?: string;
	sort?: onlineSortType;
	page?: string;
};

type HomeProps = {
	searchParams: Promise<SearchParams | undefined> | SearchParams | undefined;
};

const OnlinePage = async ({ searchParams }: HomeProps): Promise<JSX.Element> => {
	const csp = await searchParams;
	const query = csp?.query || "";
	const sort: onlineSortType = csp?.sort || "date";
	const currentPage = Number(csp?.page) || 1;
	const data = await getMainPage(currentPage, sort, query);
	const totalPage = data.num_pages;
	return (
		<>
			<div className="flex justify-center items-center gap-4">
				<FireIcon className="w-6 text-red-500" />
				<h1 className="text-2xl font-bold">Online</h1>
			</div>
			<Suspense key={query + currentPage} fallback={<SkeletonKomik />}>
				<div className="flex justify-center items-center gap-4 my-4">
					<SortOnline />
				</div>
				<div className="my-8 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
					<ChapterListOnline data={data} />
				</div>
			</Suspense>
			<div className="flex justify-center my-28">
				<Pagination totalPages={totalPage} />
			</div>
		</>
	);
};

export default OnlinePage;
