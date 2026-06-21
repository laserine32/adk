import { getLanguage, relatedType } from "@/lib/nhapi";
import Link from "next/link";
import LazyImage from "./lazy-image";

const MoreLikeThisOnline = ({ data, thumb_servers }: { data: relatedType[]; thumb_servers: string[] }) => {
	return (
		<>
			<div className="my-4 bg-border rounded p-4 flex flex-col">
				<h1 className="text-xl font-bold mb-6 text-center">More Like This</h1>
				<div className="my-4 grid grid-cols-2 md:grid-cols-5 gap-4">
					{data.map((e, i) => {
						const cdn_thumb = thumb_servers[i % thumb_servers.length];
						const imgsrc = `${cdn_thumb}/${e.thumbnail}`;
						return <Card key={i} data={e} pathName={`/online`} imgsrc={imgsrc} />;
					})}
				</div>
			</div>
		</>
	);
};

type CardProps = {
	data: relatedType;
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

export default MoreLikeThisOnline;
