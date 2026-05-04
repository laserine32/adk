import ChapterListOnline from "@/components/chapter-list-online";
import Pagination from "@/components/pagination";
import SkeletonKomik from "@/components/skeleton-komik";
import SortOnline from "@/components/sort-online";
import { getOnlineTag, getPageByTag, onlineSortType } from "@/lib/nhapi";
import { capitalizeFirstLetter } from "@/lib/utils";
import { FireIcon } from "@heroicons/react/24/outline";
import { JSX, Suspense } from "react";

export const revalidate = 3600;

export const generateMetadata = async ({ params }: { params: Promise<{ id: number }> }) => {
	const { id } = await params;
	const data = await getOnlineTag(id);
	const desc = data[0]?.type ?? `-`;
	const title = data[0]?.name ?? `-`;
	return {
		title: `${capitalizeFirstLetter(desc)}: ${capitalizeFirstLetter(title)}`,
	};
};

type TagsPageIdProps = {
	params: Promise<{ id: number }>;
	searchParams: Promise<{ query?: string; page?: string | number; sort?: onlineSortType }>;
};

const OnlineTagsPageId = async ({ params, searchParams }: TagsPageIdProps): Promise<JSX.Element> => {
	const csp = await searchParams;
	const { id } = await params;
	const sort: onlineSortType = csp?.sort || "date";
	const currentPage = Number(csp?.page) || 1;
	const [tag] = await getOnlineTag(id);
	const request = await getPageByTag(id, currentPage, sort);
	const totalPage = request.num_pages ?? 0;
	return (
		<>
			<div className="flex justify-center items-center gap-4">
				<FireIcon className="w-6 text-red-500" />
				<h1 className="text-2xl font-bold">{`${capitalizeFirstLetter(tag?.type) ?? ""}: ${capitalizeFirstLetter(tag?.name) ?? ""}`}</h1>
			</div>
			<Suspense key={currentPage} fallback={<SkeletonKomik />}>
				<div className="flex justify-center items-center gap-4 my-4">
					<SortOnline />
				</div>
				<div className="my-8 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
					<ChapterListOnline data={request} />
				</div>
			</Suspense>
			<div className="flex justify-center mt-4">
				<Pagination totalPages={totalPage} />
			</div>
		</>
	);
};

export default OnlineTagsPageId;
