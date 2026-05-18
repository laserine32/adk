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

const OnlineTagsPageId = ({ params, searchParams }: TagsPageIdProps) => {
	return (
		<>
			<Suspense fallback={<SkeletonTitleOnlineTagsPageId />}>
				<TitleOnlineTagsPageId params={params} searchParams={searchParams} />
			</Suspense>
			<Suspense fallback={<SkeletonMainOnlineTagsPageId />}>
				<MainOnlineTagsPageId params={params} searchParams={searchParams} />
			</Suspense>
		</>
	);
};

const TitleOnlineTagsPageId = async ({ params }: TagsPageIdProps): Promise<JSX.Element> => {
	const { id } = await params;
	const [tag] = await getOnlineTag(id);
	return (
		<>
			<div className="flex justify-center items-center gap-4">
				<FireIcon className="w-6 text-red-500" />
				<h1 className="text-2xl font-bold">{`${capitalizeFirstLetter(tag?.type) ?? ""}: ${capitalizeFirstLetter(tag?.name) ?? ""}`}</h1>
			</div>
		</>
	);
};

const MainOnlineTagsPageId = async ({ params, searchParams }: TagsPageIdProps): Promise<JSX.Element> => {
	const csp = await searchParams;
	const { id } = await params;
	const sort: onlineSortType = csp?.sort || "date";
	const currentPage = Number(csp?.page) || 1;
	const request = await getPageByTag(id, currentPage, sort);
	const totalPage = request.num_pages ?? 0;
	return (
		<>
			<Suspense key={currentPage} fallback={<SkeletonKomik />}>
				<div className="flex justify-center items-center gap-4 my-4">
					<SortOnline />
				</div>
				<ChapterListOnline data={request} />
			</Suspense>
			<div className="flex justify-center mt-4">
				<Pagination totalPages={totalPage} />
			</div>
		</>
	);
};

const SkeletonTitleOnlineTagsPageId = () => {
	return (
		<>
			<div className="flex justify-center items-center gap-4">
				<FireIcon className="w-6 text-red-500" />
				<h1 className="text-2xl font-bold">{`Loading...`}</h1>
			</div>
		</>
	);
};

const SkeletonMainOnlineTagsPageId = () => {
	return (
		<>
			<div className="my-8 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
				<SkeletonKomik />
			</div>
		</>
	);
};

export default OnlineTagsPageId;
