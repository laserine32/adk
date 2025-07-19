"use client"
import { formatDateToLocal } from "@/lib/utils"
import Link from "next/link"
import LazyImage from "./lazy-image"
import useIsMobile from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"

const ChapterList = ({ data, isHome = true }) => {
	const isMobile = useIsMobile()
	let pathName = usePathname()
	pathName = pathName == "/" ? "" : pathName
	console.log(pathName)
	return (
		<>
			{data.map((e) =>
				isMobile ? <CardMobile key={e.id} data={e} isHome={pathName} /> : <Card key={e.id} data={e} isHome={pathName} />
			)}
		</>
	)
}

const Card = ({ data, isHome }) => {
	const imgsrc = data.cover
	const linkhref = `${isHome}/view/${data.id}`
	let ptags = data.tags.find((e) => e.tags.type == "artist")
	if (ptags === undefined) ptags = data.tags.find((e) => e.tags.type == "group")
	return (
		<>
			<div className="linking group">
				<div className="relative h-[40vw] overflow-hidden rounded-xl md:h-[20vw]">
					<Link href={`${linkhref}`}>
						<LazyImage
							src={imgsrc}
							className="h-full w-full object-cover transition-all duration-200 ease-in-out group-hover:scale-125 group-hover:blur-sm"
						/>
						<div className="absolute right-2 bottom-2 bg-green-600 px-4 rounded">
							<p className="text-xs">{`${data.num_pages} Pages`}</p>
						</div>
					</Link>
				</div>
				<div className="relative">
					<div className="flex items-center justify-start truncate text-primary mt-1">
						<Link href={`${linkhref}`} aria-label={data.title}>
							<p className="text-md text-foreground">{data.pretty_title}</p>
							<p className="text-muted text-sm">{ptags?.tags.name}</p>
							<p className="text-muted text-sm">{formatDateToLocal(data.date)}</p>
						</Link>
					</div>
					<div className="hidden group-hover:flex items-center justify-start text-primary mt-1 absolute left-0 top-0 bg-background z-50">
						<Link href={`${linkhref}`} aria-label={data.title}>
							<p className="text-md text-foreground">{data.pretty_title}</p>
							<p className="text-muted text-sm">{ptags?.tags.name}</p>
							<p className="text-muted text-sm">{formatDateToLocal(data.date)}</p>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

const CardMobile = ({ data }) => {
	const imgsrc = data.cover
	const linkhref = `/view/${data.id}`
	let tags = data.tags.find((e) => e.tags.type == "artist")
	if (tags === undefined) tags = data.tags.find((e) => e.tags.type == "group")
	return (
		<>
			<div className="linking group grid grid-cols-3 gap-2">
				<div className="relative h-[40vw] overflow-hidden rounded-xl md:h-[20vw]">
					<Link href={`${linkhref}`}>
						<LazyImage
							src={imgsrc}
							className="h-full w-full object-cover transition-all duration-200 ease-in-out group-hover:scale-125 group-hover:blur-sm"
						/>
						<div className="absolute right-2 bottom-2 bg-green-600 px-4 rounded">
							<p className="text-xs">{`${data.num_pages} Pages`}</p>
						</div>
					</Link>
				</div>
				<div className="relative col-span-2">
					<div className="flex items-center justify-start text-primary mt-1">
						<Link href={`${linkhref}`} aria-label={data.title}>
							<p className="text-md text-foreground">{data.pretty_title}</p>
							<p className="text-muted text-sm">{tags?.tags.name}</p>
							<p className="text-muted text-sm">{formatDateToLocal(data.date)}</p>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default ChapterList
