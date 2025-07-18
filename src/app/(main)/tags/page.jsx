import { Skeleton } from "@/components/shared/skeleton"
import { tagsModel } from "@/lib/repo"
import { capitalizeFirstLetter, cn } from "@/lib/utils"
import { TagIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { Suspense } from "react"

export const generateMetadata = () => {
	return {
		title: `Tags`,
	}
}

const TagsPage = async () => {
	const data = await tagsModel.getAll()
	return (
		<>
			<div className="flex justify-center items-center gap-4">
				<TagIcon className="w-6 text-red-500" />
				<h1 className="text-2xl font-bold">Tags</h1>
			</div>
			<Suspense key={data} fallback={<TagsSkeleton />}>
				{/* {data.map((e, i) => (
					))} */}
				<TagsElm data={data} />
			</Suspense>
		</>
	)
}

const TagsElm = ({ data }) => {
	const items = Object.groupBy(data, (e) => e.type)
	// console.log(items)
	let elm = []
	for (let e in items) {
		elm.push(<TagsRender key={e} title={capitalizeFirstLetter(e)} data={items[e]} />)
	}
	return <>{elm.map((e) => e)}</>
}

const TagsRender = ({ title, data }) => {
	return (
		<>
			<h1>{title}</h1>
			<div className="my-8 flex gap-2 w-full flex-wrap justify-center items-center">
				{data.map((e, i) => (
					<Link href={`/tags/${e.id}`} key={i}>
						<div className="rounded bg-input px-4 py-1 cursor-pointer hover:bg-input/50">{e.name}</div>
					</Link>
				))}
			</div>
		</>
	)
}

const TagsSkeleton = () => {
	const data = [...Array(40).keys()]
	const width = ["px-12", "px-8", "px-10"]
	return (
		<>
			<div className="my-8 flex gap-2 w-full flex-wrap justify-center items-center">
				{data.map((e) => {
					const random = Math.floor(Math.random() * width.length)
					return <Skeleton key={e} className={cn(width[random], "rounded py-4")} />
				})}
			</div>
		</>
	)
}

export default TagsPage

/* 
<Link href={`/tags/${data.id}`}>
				<div className="rounded bg-input px-4 py-1 cursor-pointer hover:bg-input/50">{data.name}</div>
			</Link>
*/
