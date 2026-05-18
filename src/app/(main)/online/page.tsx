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

export const generateMetadata = async ({ searchParams }: HomeProps) => {
	const csp = await searchParams;
	const query = csp?.query || "";
	const title = query == "" ? `Online` : `Search result for "${query}" | Online`;
	return {
		title: `${title}`,
	};
};

const OnlinePage = ({ searchParams }: HomeProps) => {
	return (
		<>
			<div className="flex justify-center items-center gap-4">
				<FireIcon className="w-6 text-red-500" />
				<h1 className="text-2xl font-bold">Online</h1>
			</div>
			<Suspense fallback={<SkeletonKomik />}>
				<MainOnlinePage searchParams={searchParams} />
			</Suspense>
		</>
	);
};

const MainOnlinePage = async ({ searchParams }: HomeProps): Promise<JSX.Element> => {
	const csp = await searchParams;
	const query = csp?.query || "";
	const sort: onlineSortType = csp?.sort || "date";
	const currentPage = Number(csp?.page) || 1;
	const data = await getMainPage(currentPage, sort, query);
	const totalPage = data.num_pages;
	return (
		<>
			<Suspense key={`${query} ${sort} ${currentPage}`} fallback={<SkeletonKomik />}>
				<div className="flex justify-center items-center gap-4 my-4">
					<SortOnline />
				</div>
				<ChapterListOnline data={data} />
				<div className="flex justify-center my-28">
					<Pagination totalPages={totalPage} />
				</div>
			</Suspense>
		</>
	);
};

export default OnlinePage;
