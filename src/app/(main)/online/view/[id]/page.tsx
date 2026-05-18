import SkeletonView from "@/components/skeleton-view";
import ViewMangaOnline from "@/components/view-manga-online";
import { getGallery } from "@/lib/nhapi";
import { Suspense } from "react";

export const revalidate = 3600;

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const data = await getGallery(Number(id));
	const title = data?.title?.english ?? `Not Found`;
	return {
		title: `${title}`,
	};
};

const OnlineViewPage = ({ params }: { params: Promise<{ id: string }> }) => {
	return (
		<>
			<Suspense fallback={<SkeletonView />}>
				<MainOnlineViewPage params={params} />
			</Suspense>
		</>
	);
};

const MainOnlineViewPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const data = await getGallery(Number(id));
	return (
		<>
			<ViewMangaOnline komik={data} />
		</>
	);
};

export default OnlineViewPage;
