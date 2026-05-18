import React, { JSX, Suspense } from "react";
import ChapterList from "@/components/chapter-list";
import Pagination from "@/components/pagination";
import SkeletonKomik from "@/components/skeleton-komik";
import { FireIcon } from "@heroicons/react/24/solid";
import { getKomikgetSearchPagin, getKomikTotalPage } from "@/db/queries/komik";
import { CDNType, getCDN } from "@/lib/nhapi";

export const revalidate = 3600;

type SearchParams = {
	query?: string;
	page?: string;
};

type HomeProps = {
	searchParams: Promise<SearchParams | undefined> | SearchParams | undefined;
};

const Home = ({ searchParams }: HomeProps) => {
	return (
		<>
			<div className="flex justify-center items-center gap-4">
				<FireIcon className="w-6 text-red-500" />
				<h1 className="text-2xl font-bold">Home</h1>
			</div>
			<div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
				<Suspense fallback={<SkeletonKomik />}>
					<MainHome searchParams={searchParams} />
				</Suspense>
			</div>
			<Suspense>
				<MainPaginationHome searchParams={searchParams} />
			</Suspense>
		</>
	);
};

const MainHome = async ({ searchParams }: HomeProps): Promise<JSX.Element> => {
	const csp = await searchParams;
	const query = csp?.query || "";
	const currentPage = Number(csp?.page) || 1;
	const data = await getKomikgetSearchPagin(query, currentPage);
	const image_cdn: CDNType = await getCDN();
	return (
		<>
			<ChapterList data={data} image_cdn={image_cdn} />
		</>
	);
};
const MainPaginationHome = async ({ searchParams }: HomeProps): Promise<JSX.Element> => {
	const csp = await searchParams;
	const query = csp?.query || "";
	const totalPage = await getKomikTotalPage(query);
	return (
		<>
			<div className="flex justify-center my-28">
				<Pagination totalPages={totalPage} />
			</div>
		</>
	);
};

export default Home;
