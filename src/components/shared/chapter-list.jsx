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
	const imgsrc = data.cover //data.poster ? data.poster : data.thumb
	// const imgsrc = "https://raw.githubusercontent.com/laserine32/iatnehn/master/data/98330d/02.webp"
	const linkhref = `/view/${data.id}`
	return (
		<>
			<div className="linking group">
				<div className="relative h-[40vw] overflow-hidden rounded-xl md:h-[20vw]">
					<Link href={`${linkhref}`}>
						<LazyImage
							src={imgsrc}
							className="h-full w-auto object-cover transition-all duration-200 ease-in-out group-hover:scale-125 group-hover:blur-sm"
						/>
						<div className="absolute left-0 top-0 hidden h-full w-full items-center justify-center bg-black/50 text-white transition-all duration-1000 ease-in-out group-hover:flex">
							{/* <PiBookOpenTextDuotone size={56} /> */}
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

/* 

						<img
							src={imgsrc}
							width={126}
							height={196}
							alt={data.id}
							// placeholder="blur"
							// blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/0z6RAAAAABJRU5ErkJggg=="
							// loading="lazy"
							className="h-full w-auto object-cover transition-all duration-200 ease-in-out group-hover:scale-125 group-hover:blur-sm"
						/>

*/
