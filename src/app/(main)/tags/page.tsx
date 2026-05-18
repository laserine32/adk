import { Skeleton } from "@/components/skeleton";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { TagIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { AllTags, getAllTags, groupTags, GroupTags, Tags } from "@/db/queries/tags";

export const revalidate = 3600;

export const generateMetadata = (): Metadata => {
	return {
		title: "Tags",
	};
};

const TagsPage = () => {
	return (
		<>
			<div className="flex justify-center items-center gap-4">
				<TagIcon className="w-6 text-red-500" />
				<h1 className="text-2xl font-bold">Tags</h1>
			</div>
			<Suspense fallback={<TagsSkeleton />}>
				<TagsMainPage />
			</Suspense>
		</>
	);
};

const TagsMainPage = async () => {
	const data: AllTags = await getAllTags();
	return (
		<>
			<TagsElm data={data} />
		</>
	);
};

const TagsElm = ({ data }: { data: AllTags }) => {
	const items: GroupTags = groupTags(data);
	const tags = [];
	for (const e in items) {
		tags.push(<TagsRender key={e} title={capitalizeFirstLetter(e)} data={items[e] ?? []} />);
	}
	return <>{tags.map((e) => e)}</>;
};

const TagsRender = ({ title, data }: { title: string; data: AllTags }) => {
	return (
		<>
			<h1>{title}</h1>
			<div className="my-8 flex gap-2 w-full flex-wrap justify-center items-center">
				{data.map((e: Tags) => (
					<Link href={`/tags/${e.id}`} key={e.id}>
						<div className="rounded bg-input px-4 py-1 cursor-pointer hover:bg-input/50">{e.name}</div>
					</Link>
				))}
			</div>
		</>
	);
};

const TagsSkeleton = () => {
	const data = [...Array(140).keys()];
	const width = ["px-12", "px-8", "px-10"];
	const GenerateTags = () => {
		const random = Math.floor(Math.random() * width.length);
		return <Skeleton className={cn(width[random], "rounded py-4")} />;
	};
	return (
		<>
			<div className="my-8 flex gap-2 w-full flex-wrap justify-center items-center">
				{data.map((e) => (
					<GenerateTags key={e} />
				))}
			</div>
		</>
	);
};

export default TagsPage;
