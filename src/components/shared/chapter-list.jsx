import { formatDateToLocal } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import LazyImage from "./lazy-image"

const ChapterList = ({ data }) => {
	return (
		<>
			{data.map((e) => (
				<Card key={e.id} data={e} />
			))}
		</>
	)
}

const Card = ({ data }) => {
	const imgsrc = data.cover
	const linkhref = `/view/${data.id}`
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
				<div className="flex items-center justify-start overflow-hidden text-ellipsis whitespace-nowrap text-primary mt-1">
					<div>
						<Link href={`${linkhref}`} aria-label={data.title}>
							<p className="text-md text-foreground">{data.title}</p>
							<span className="text-muted text-sm">{formatDateToLocal(data.date)}</span>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default ChapterList
