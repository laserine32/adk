import { capitalizeFirstLetter, unicodeToChar } from "@/lib/utils"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ListBulletIcon } from "@heroicons/react/24/outline"
import ListLazyImage from "../shared/list-lazy-image"
import LazyImage from "../shared/lazy-image"

const ViewManga = ({ komik }) => {
	const { data, nav } = komik
	const ptags = data.tags.flatMap((e) => e.tags)
	const gtags = Object.groupBy(ptags, (e) => e.type)
	// console.log(ptags)
	// console.log(gtags)
	return (
		<>
			<div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-border rounded p-4">
				<div className="flex items-center justify-center">
					<img src={data.cover} className="w-1/2" />
				</div>
				<div>
					<h1 className="text-xl font-bold text-foreground mb-6">{data.title}</h1>
					<h3 className=" mb-6 text-foreground">{unicodeToChar(data.japanese_title)}</h3>
					<div className="my-4 flex-row w-full">
						<RenderTags data={ptags} />
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center">
				{data.pages.map((e) => (
					<LazyImage src={e.img} key={e.id} alt={e.num} className="w-full mb-1" />
				))}
				{/* <ListLazyImage images={data.pages} /> */}
			</div>
			<ReaderNav data={nav} />
		</>
	)
}

const RenderTags = ({ data }) => {
	const items = Object.groupBy(data, (e) => e.type)
	let elm = []
	for (let e in items) {
		elm.push(<TagsRender key={e} title={capitalizeFirstLetter(e)} data={items[e]} />)
	}
	return <>{elm.map((e) => e)}</>
}

const TagsRender = ({ title, data }) => {
	return (
		<>
			<div className="my-2 flex gap-2">
				<h3>{title}</h3>
				<div className="flex gap-2 flex-wrap">
					{data.map((tag) => (
						<Tag key={tag.id} data={tag} />
					))}
				</div>
			</div>
		</>
	)
}

const Tag = ({ data }) => {
	return (
		<>
			<Link href={`/tags/${data.id}`}>
				<div className="rounded bg-input px-4 py-1 cursor-pointer hover:bg-input/50">{data.name}</div>
			</Link>
		</>
	)
}

const ReaderNav = ({ data }) => {
	return (
		<div className="sticky bottom-0">
			<div className="grid grid-cols-3">
				<Link
					href={data.prev}
					className={cn(
						"linking rounded-l-md py-2.5 bg-dialect text-white flex justify-center items-center gap-2 hover:bg-muted",
						!data.prev && "pointer-events-none"
					)}
				>
					<ChevronDoubleLeftIcon className="size-6" />
					<p className="hidden md:block">Next Comic</p>
				</Link>
				<Link
					href={data.list}
					className="linking py-2.5 bg-background text-primary-foreground flex justify-center items-center gap-2 hover:bg-muted"
				>
					<p className="hidden md:block">List Comic</p>
					<ListBulletIcon className="size-6 block md:hidden" />
				</Link>
				<Link
					href={data.next}
					className={cn(
						"linking rounded-r-md py-2.5 bg-dialect text-white flex justify-center items-center gap-2 hover:bg-muted",
						!data.next && "pointer-events-none"
					)}
				>
					<p className="hidden md:block">Prev Comic</p>
					<ChevronDoubleRightIcon className="size-6" />
				</Link>
			</div>
		</div>
	)
}

export default ViewManga
