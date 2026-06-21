"use client";
import { GalleryType } from "@/lib/nhapi";
import { cn } from "@/lib/utils";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

const SaveOnline = ({
	data,
	image_servers,
	thumb_servers,
}: {
	data: GalleryType;
	image_servers: string[];
	thumb_servers: string[];
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isAvailable, setIsAvailable] = useState(false);
	// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	useEffect(() => {
		const checkAvail = async () => {
			const request = await fetch(`/api/check/${data.id}`);
			const response = await request.json();
			setIsAvailable(response.available);
		};
		checkAvail();
	}, [data.id]);

	const handleClickSave = async () => {
		setIsLoading(true);
		const parcel = {
			komik: {
				id: data.id,
				title: data.title.english,
				japaneseTitle: data.title.japanese,
				prettyTitle: data.title.pretty,
				images: toBase64(JSON.stringify(data)),
				cover: `${thumb_servers[0]}/${data.cover.path}`,
				uploadDate: data.upload_date,
				numPages: data.num_pages,
				numFavorites: data.num_favorites,
				numId: 0,
			},
			pages: data.pages.map((e) => ({
				id: genIdPage(`${data.id}`, `${e.number}`),
				komikId: data.id,
				img: `${image_servers[0]}/${e.path}`,
				num: e.number,
			})),
			tags: data.tags.map((e) => ({
				id: e.id,
				type: e.type,
				name: e.name,
			})),
			tagsOnKomik: data.tags.map((e) => ({
				komikId: data.id,
				tagsId: e.id,
			})),
		};
		// console.log(parcel);
		// await delay(3000);
		const request = await fetch(`/api/add`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(parcel),
		});
		const response = await request.json();
		console.log(response);
		setIsAvailable(true);
		setIsLoading(false);
	};
	return (
		<>
			<div className="my-4 flex w-full">
				{isAvailable ? (
					<Link href={`/view/${data.id}`} className="w-full">
						<div className="rounded w-full flex justify-center items-center bg-input px-2 py-1 cursor-pointer hover:bg-input/50">
							View
						</div>
					</Link>
				) : (
					<button
						onClick={() => handleClickSave()}
						className={cn(
							"rounded w-full flex justify-center items-center bg-input px-2 py-1 cursor-pointer hover:bg-input/50",
							isLoading && `bg-input/50 cursor-none`,
						)}
					>
						{isLoading ? <ArrowPathIcon className="my-1 animate-spin" width={18} height={18} /> : `Save`}
					</button>
				)}
			</div>
		</>
	);
};

const toBase64 = (text: string) => {
	const utf8Bytes = new TextEncoder().encode(text);
	const binaryString = String.fromCharCode(...utf8Bytes);
	return btoa(binaryString);
};

const genIdPage = (idkomik: string, num: string) => {
	return `${idkomik}${num.padStart(4, "0")}`;
};

export default SaveOnline;
