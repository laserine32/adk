import NotFound from "@/app/not-found"
import { GalleryType, getCDN, NHTag, NHTitle } from "@/lib/nhapi"
import { capitalizeFirstLetter, formatUnixTimeAgo, getRandomInt, unicodeToChar } from "@/lib/utils"
import Link from "next/link"
import LazyImage from "./lazy-image"
import { JSX } from "react"

const ViewMangaOnline = async ({ komik }: { komik:GalleryType}) => {
  if (!komik) {
		return (
			<>
				<NotFound withNav={false} />
			</>
		)
	}
  const { image_servers, thumb_servers } = await getCDN()
  const rng = getRandomInt(1,100)
  const cdn_thumb = thumb_servers[rng % thumb_servers.length]
  const coverImg = `${cdn_thumb}/${komik.cover.path}` 
  return (
    <>
      <div className="my-4 grid grid-cols-1 md:grid-cols-5 gap-4 bg-border rounded p-4">
				<div className="flex items-center justify-center md:col-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={coverImg} className="w-3/4" alt={komik.title.english} />
				</div>
				<div className="md:col-span-3">
					{/* <h1 className="text-xl font-bold text-foreground mb-6">{komik.title.english}</h1> */}
          <h1 className="text-xl font-bold mb-6"><ExpandTitle title={komik.title} /></h1>
					<h3 className=" mb-6 text-foreground">{unicodeToChar(komik.title.japanese)}</h3>
					<div className="my-4 flex-row w-full">
						<RenderTags data={komik.tags} />
            <div className="my-2 flex gap-1">
              <h3>Pages</h3>
              <div className="flex gap-1 flex-wrap">
                <Badge text={`${komik.num_pages}`} />
              </div>
            </div>
            <div className="my-2 flex gap-1">
              <h3>Uploaded</h3>
              <p>{formatUnixTimeAgo(`${komik.upload_date}`)}</p>
            </div>
					</div>
				</div>
			</div>
      <div className="flex flex-col justify-center items-center">
        {komik.pages.map((e,i) => {
          const cdn_image = image_servers[i % image_servers.length]
					const imgsrc = `${cdn_image}/${e.path}` 
          return <LazyImage src={imgsrc} key={e.number} className="w-full mb-1" />
        })}
      </div>
    </>
  )
}

type TitlePart = {
  type: 'pretty' | 'other'
  value: string
}

const ExpandTitle = ({ title }:{ title: NHTitle }): JSX.Element => {
  const { english, pretty } = title
  const result: TitlePart[] = []

  const index = english.indexOf(pretty)
  if (index === -1) {
    return (<span className="text-foreground/5">{english}</span>)
  }

  const before = english.slice(0, index).trim()
  const after = english.slice(index + pretty.length).trim()

  if (before) {
    result.push({ type: 'other', value: before })
  }
  result.push({ type: 'pretty', value: pretty })
  if (after) {
    result.push({ type: 'other', value: after })
  }

  return (
    <>
      {result.map((e, i) => {
        if(e.type == 'other'){
          return (<span key={i} className="text-foreground/60">{e.value}</span>)
        }
        return (<span key={i} className="text-foreground"> {e.value} </span>)
      })}
    </>
  )

}

const RenderTags = ({ data }: { data:NHTag[] }) => {
  const items = Object.groupBy(data, (e) => e.type)
  const elm = []
  for (const e in items) {
    const item:NHTag[] = items[e] ?? []
    elm.push(<TagsRender key={e} title={capitalizeFirstLetter(e)} data={item} />)
  }
  return <>{elm.map((e) => e)}</>
}

const TagsRender = ({ title, data }:{ title:string, data:NHTag[] }) => {
  return (
    <>
      <div className="my-2 flex gap-1">
        <h3>{title}</h3>
        <div className="flex gap-1 flex-wrap">
          {data.map((tag,i) => (
            <Tag key={i} data={tag} />
          ))}
        </div>
      </div>
    </>
  )
}

const Tag = ({ data }: { data:NHTag }) => {
	return (
		<>
			<Link href={`/online/tags/${data.id}`}>
        <Badge text={data.name} count={data.count} />
			</Link>
		</>
	)
}

const Badge = ({ text, count=-1 }:{ text:string, count?:number }) => {
  if(count < 0){
    return (<div className="rounded bg-input px-2 py-1 cursor-pointer hover:bg-input/50">{text}</div>)
  }
  return (
    <>
      <div className="group p-1 cursor-pointer flex justify-center">
        <div className="rounded-l px-2 bg-input group-hover:bg-input/50">{text}</div>
        <div className="rounded-r px-2 bg-input/50 group-hover:bg-input/40">{count}</div>
      </div>
    </>
  )
}

export default ViewMangaOnline