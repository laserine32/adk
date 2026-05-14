import { CDNType, getCDN, getLanguage, NHMainPageType, ResultNHMainPageType } from "@/lib/nhapi";
import Link from "next/link";
import LazyImage from "./lazy-image";

const ChapterListOnline = async ({ data }: { data: NHMainPageType }) => {
	const pathname = `/online`;
	if (data.result.length === 0) {
		return (
			<>
				<div>
					<h4>Not Found!</h4>
				</div>
			</>
		);
	}
	const image_cdn: CDNType = await getCDN();
	const { thumb_servers } = image_cdn;
	return (
		<>
			<div className="my-8 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
				{data.result.map((e, i) => {
					const cdn_thumb = thumb_servers[i % thumb_servers.length];
					const imgsrc = `${cdn_thumb}/${e.thumbnail}`;
					return <Card key={i} data={e} pathName={pathname} imgsrc={imgsrc} />;
				})}
			</div>
		</>
	);
};

type CardProps = {
	data: ResultNHMainPageType;
	pathName: string;
	imgsrc: string;
};

const Card: React.FC<CardProps> = ({ data, pathName, imgsrc }) => {
	const linkhref = `${pathName}/view/${data.id}`;
	const tagLanguage = getLanguage(data.tag_ids);
	const language = tagLanguage ? tagLanguage.flag : ``;
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
						<Link href={`${linkhref}`} aria-label={data.english_title}>
							<p className="text-md text-foreground">
								{language} {data.english_title}
							</p>
						</Link>
					</div>
					<div className="hidden group-hover:flex items-center justify-start text-primary mt-1 absolute left-0 top-0 bg-background z-50">
						<Link href={`${linkhref}`} aria-label={data.english_title}>
							<p className="text-md text-foreground">
								{language} {data.english_title}
							</p>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChapterListOnline;
