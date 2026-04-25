import React, { JSX, Suspense } from 'react'
import { AllTags, getAllTags, getTags } from '@/db/queries/tags';
import { getKomikTaggetSearchPagin, getKomikTagTotalPage } from '@/db/queries/komik';
import ChapterList from "@/components/chapter-list"
import Pagination from "@/components/pagination"
import SkeletonKomik from "@/components/skeleton-komik"
import { FireIcon } from "@heroicons/react/24/solid"
import { CDNType, getCDN } from '@/lib/nhapi';

export const revalidate = 3600;

export async function generateStaticParams() {
  const all: AllTags = await getAllTags()
  return all.map((item) => ({
    id: `${item.id}`,
  }))
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
	const { id } = await params
	const data = await getTags(Number(id))
	const title = data.name
	return {
		title: `${title}`,
	}
}

type TagsPageIdProps = {
  params: Promise<{ id: string | number }>;
  searchParams: Promise<{ query?: string; page?: string | number }>;
};

const TagsPageId = async ({ params, searchParams }: TagsPageIdProps): Promise<JSX.Element> => {
	const csp = await searchParams
	const { id } = await params
  const query = csp?.query || ""
  const currentPage = Number(csp?.page) || 1
  const tag = await getTags(Number(id))
  const data = await getKomikTaggetSearchPagin(Number(id), query, currentPage)
  const totalPage = await getKomikTagTotalPage(Number(id), query)
	const image_cdn:CDNType = await getCDN()
  return (
    <>
    <div className="flex justify-center items-center gap-4">
				<FireIcon className="w-6 text-red-500" />
				<h1 className="text-2xl font-bold">{tag.name}</h1>
			</div>
			<div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
				<Suspense key={query + currentPage} fallback={<SkeletonKomik />}>
					<ChapterList data={data} image_cdn={image_cdn} />
				</Suspense>
			</div>
			<div className="flex justify-center mt-4">
				<Pagination totalPages={totalPage} />
			</div>
    </>
  )
}

export default TagsPageId