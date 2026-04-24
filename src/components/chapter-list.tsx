"use client"
import { formatDateToLocal } from "@/lib/utils"
import Link from "next/link"
import LazyImage from "./lazy-image"
import useIsMobile from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"
import { KomikgetSearchPagin, KomikWithTagsGrouped } from "@/db/queries/komik"
import { CDNType } from "@/lib/nhapi"

type ChapterListProps = {
  data: KomikgetSearchPagin
	image_cdn: CDNType
}

const ChapterList: React.FC<ChapterListProps> = ({ data, image_cdn }) => {
	const isMobile = useIsMobile()
	let pathName = usePathname()
	pathName = pathName == "/" ? "" : pathName
	const { image_servers, thumb_servers } = image_cdn
  return (
    <>
      {data.map((e, i) => {
				let cdn_thumb = thumb_servers[i % thumb_servers.length]
				const testurl = e.cover.split("/")[2][0]
				if(testurl == "i"){
					cdn_thumb = image_servers[i % image_servers.length]
				}
				const imgsrc = cdn_thumb + "/" + e.cover.split("/").slice(-3).join("/")
				return isMobile ? <CardMobile key={e.id} data={e} pathName={pathName} imgsrc={imgsrc} /> : <Card key={e.id} data={e} pathName={pathName} imgsrc={imgsrc} />
			})}
    </>
  )
}

type CardProps = {
  data: KomikWithTagsGrouped
  pathName: string
	imgsrc: string
}

const Card: React.FC<CardProps> = ({ data, pathName, imgsrc }) => {
  // const imgsrc = data.cover
	const linkhref = `${pathName}/view/${data.id}`
	let ptags = data.tags.find((e) => e.type == "artist")
	if (ptags === undefined) ptags = data.tags.find((e) => e.type == "group")
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
							<p className="text-xs">{`${data.numPages} Pages`}</p>
						</div>
					</Link>
				</div>
				<div className="relative">
					<div className="flex items-center justify-start truncate text-primary mt-1">
						<Link href={`${linkhref}`} aria-label={data.title}>
							<p className="text-md text-foreground">{data.prettyTitle}</p>
							<p className="text-muted text-sm">{ptags?.name}</p>
							<p className="text-muted text-sm">{formatDateToLocal(data.date)}</p>
						</Link>
					</div>
					<div className="hidden group-hover:flex items-center justify-start text-primary mt-1 absolute left-0 top-0 bg-background z-50">
						<Link href={`${linkhref}`} aria-label={data.title}>
							<p className="text-md text-foreground">{data.prettyTitle}</p>
							<p className="text-muted text-sm">{ptags?.name}</p>
							<p className="text-muted text-sm">{formatDateToLocal(data.date)}</p>
						</Link>
					</div>
				</div>
			</div>
    </>
  )
}

const CardMobile: React.FC<CardProps> = ({ data, pathName, imgsrc }) => {
	// const imgsrc = data.cover
	const linkhref = `${pathName}/view/${data.id}`
	let tags = data.tags.find((e) => e.type == "artist")
	if (tags === undefined) tags = data.tags.find((e) => e.type == "group")
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
							<p className="text-xs">{`${data.numPages} Pages`}</p>
						</div>
					</Link>
				</div>
				<div className="relative col-span-2">
					<div className="flex items-center justify-start text-primary mt-1">
						<Link href={`${linkhref}`} aria-label={data.title}>
							<p className="text-md text-foreground">{data.prettyTitle}</p>
							<p className="text-muted text-sm">{tags?.name}</p>
							<p className="text-muted text-sm">{formatDateToLocal(data.date)}</p>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default ChapterList