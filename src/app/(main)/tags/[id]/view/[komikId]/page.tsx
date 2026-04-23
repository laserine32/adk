import SkeletonView from "@/components/skeleton-view";
import ViewManga from "@/components/view-manga";
import { getKomik, getKomikPageTag } from "@/db/queries/komik";
import { Suspense } from "react";

export const revalidate = 3600;

type TypeParams = Promise<{
  id: string
  komikId: string
}>

export const generateMetadata = async ({
  params,
}: {
  params: TypeParams
}) => {
  const { komikId } = await params
  const data = await getKomik(Number(komikId))
  const title = data.title
  return {
    title: `${title}`,
  }
}

const TagViewPage = async ({
  params,
}: {
  params: TypeParams
}) => {
  const { id, komikId } = await params
  const data = await getKomikPageTag(Number(komikId), Number(id))
  return (
    <>
			<Suspense key={id} fallback={<SkeletonView />}>
				<ViewManga komik={data} />
			</Suspense>
		</>
  )
}

export default TagViewPage