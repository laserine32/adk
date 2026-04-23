import SkeletonView from "@/components/skeleton-view";
import ViewManga from "@/components/view-manga";
import { getKomik, getKomikPage } from "@/db/queries/komik";
import { Suspense } from "react";

export const revalidate = 3600;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const data = await getKomik(Number(id))
  const title = data?.title ?? `Not Found`
  return {
    title: `${title}`,
  }
}

const ViewPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const data = await getKomikPage(Number(id))
  return (
    <>
			<Suspense key={id} fallback={<SkeletonView />}>
				<ViewManga komik={data} />
			</Suspense>
		</>
  )
}

export default ViewPage