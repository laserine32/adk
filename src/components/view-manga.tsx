import { capitalizeFirstLetter, getRandomInt, unicodeToChar } from "@/lib/utils";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import LazyImage from "./lazy-image";
import { KomikPage, NavKomikPage, TagsMinType } from "@/db/queries/komik";
import NotFound from "@/app/not-found";
import { getCDN } from "@/lib/nhapi";

const ViewManga = async ({ komik }: { komik: KomikPage }) => {
	const { data, nav } = komik;
	if (!data) {
		return (
			<>
				<NotFound withNav={false} />
			</>
		);
	}
	const { image_servers, thumb_servers } = await getCDN();
	const rng = getRandomInt(1, 100);
	let cdn_thumb = thumb_servers[rng % thumb_servers.length];
	const testurl = data.cover.split("/")[2][0];
	if (testurl == "i") {
		cdn_thumb = image_servers[rng % image_servers.length];
	}
	const imgsrc = cdn_thumb + "/" + data.cover.split("/").slice(-3).join("/");
	return (
		<>
			<div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-border rounded p-4">
				<div className="flex items-center justify-center">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={imgsrc} className="w-1/2" alt={data.title} loading="lazy" />
				</div>
				<div>
					<h1 className="text-xl font-bold text-foreground mb-6">{data.title}</h1>
					<h3 className=" mb-6 text-foreground">{unicodeToChar(data.japaneseTitle)}</h3>
					<div className="my-4 flex-row w-full">
						<RenderTags data={data.tags} />
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center md:flex-row-reverse md:items-center md:flex-wrap md:gap-2">
				{data.pages.map((e, i) => {
					const cdn_thumb = image_servers[i % image_servers.length];
					const imgsrc = cdn_thumb + "/" + e.img.split("/").slice(-3).join("/");
					return (
						<div key={e.id} className="md:w-[20vw]">
							<LazyImage src={imgsrc} className="w-full mb-1" />
						</div>
					);
				})}
			</div>
			<ReaderNav data={nav} />
		</>
	);
};

const RenderTags = ({ data }: { data: TagsMinType[] }) => {
	const items = Object.groupBy(data, (e) => e.type);
	const elm = [];
	for (const e in items) {
		const item: TagsMinType[] = items[e] ?? [];
		elm.push(<TagsRender key={e} title={capitalizeFirstLetter(e)} data={item} />);
	}
	return <>{elm.map((e) => e)}</>;
};

const TagsRender = ({ title, data }: { title: string; data: TagsMinType[] }) => {
	return (
		<>
			<div className="my-2 flex gap-2">
				<h3>{title}</h3>
				<div className="flex gap-2 flex-wrap">
					{data.map((tag, i) => (
						<Tag key={i} data={tag} />
					))}
				</div>
			</div>
		</>
	);
};

const Tag = ({ data }: { data: TagsMinType }) => {
	return (
		<>
			<Link href={`/tags/${data.id}`}>
				<div className="rounded bg-input px-4 py-1 cursor-pointer hover:bg-input/50">{data.name}</div>
			</Link>
		</>
	);
};

const ReaderNav = ({ data }: { data: NavKomikPage }) => {
	return (
		<div className="sticky bottom-0">
			<div className="grid grid-cols-3">
				<Link
					href={data?.prev ?? ``}
					className={cn(
						"linking rounded-l-md py-2.5 bg-dialect text-white flex justify-center items-center gap-2 hover:bg-muted",
						!data?.prev && "pointer-events-none",
					)}
				>
					<ChevronDoubleLeftIcon className="size-6" />
					<p className="hidden md:block">Next Comic</p>
				</Link>
				<Link
					href={data?.list ?? ""}
					className="linking py-2.5 bg-background text-primary-foreground flex justify-center items-center gap-2 hover:bg-muted"
				>
					<p className="hidden md:block">List Comic</p>
					<ListBulletIcon className="size-6 block md:hidden" />
				</Link>
				<Link
					href={data?.next ?? ""}
					className={cn(
						"linking rounded-r-md py-2.5 bg-dialect text-white flex justify-center items-center gap-2 hover:bg-muted",
						!data?.next && "pointer-events-none",
					)}
				>
					<p className="hidden md:block">Prev Comic</p>
					<ChevronDoubleRightIcon className="size-6" />
				</Link>
			</div>
		</div>
	);
};

export default ViewManga;
