import SkeletonView from "@/components/shared/skeleton-view"
import ViewManga from "@/components/ui/view_manga"
import { pageModel } from "@/lib/repo"
import { Suspense } from "react"

export const generateMetadata = async ({ params }) => {
	const { id } = await params
	const data = await pageModel.get(Number(id))
	const title = data.title
	return {
		title: `${title}`,
	}
}

const ViewPage = async ({ params }) => {
	const { id } = await params
	const data = await pageModel.getPageData(Number(id))
	return (
		<>
			<Suspense key={id} fallback={<SkeletonView />}>
				<ViewManga komik={data} />
			</Suspense>
		</>
	)
}

export default ViewPage
