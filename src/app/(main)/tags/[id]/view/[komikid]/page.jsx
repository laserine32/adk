import SkeletonView from "@/components/shared/skeleton-view"
import ViewManga from "@/components/ui/view_manga"
import { pageModel } from "@/lib/repo"
import { Suspense } from "react"

export const generateMetadata = async ({ params }) => {
	const { komikid } = await params
	const data = await pageModel.get(Number(komikid))
	const title = data.title
	return {
		title: `${title}`,
	}
}

const TagViewPage = async ({ params }) => {
	const { komikid } = await params
	const data = await pageModel.getPageData(Number(komikid))
	return (
		<>
			<Suspense key={komikid} fallback={<SkeletonView />}>
				<ViewManga komik={data} />
			</Suspense>
		</>
	)
}

export default TagViewPage
