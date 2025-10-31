import { NextResponse } from "next/server"
import cors from "cors"
import axios from "axios"
import { genMediaUrl } from "@/lib/utils"
import { komikModel, tagsKomikModel, tagsModel } from "@/lib/repo"

const corsMiddleware = cors({
	origin: "*",
	methods: ["POST", "OPTIONS"],
	allowedHeaders: ["Content-Type"],
})

function runMiddleware(req, middleware) {
	return new Promise((resolve, reject) => {
		middleware(
			req,
			{
				setHeader: (key, value) => {
					req.headers[key] = value
				},
				end: () => resolve(),
			},
			(err) => (err ? reject(err) : resolve())
		)
	})
}

export const POST = async (request) => {
	try {
		// await runMiddleware(request, corsMiddleware)
		// const { url } = await request.json()
		// if (!url) {
		// 	return NextResponse.json({ message: "Url is required" }, { status: 400 })
		// }
		// try {
		// 	new URL(url)
		// } catch {
		// 	return NextResponse.json({ message: "Invalid URL format" }, { status: 400 })
		// }
		// const response = await axios.get(url, {
		// 	headers: {
		// 		"User-Agent":
		// 			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
		// 	},
		// })
		// const htmlContent = response.data
		// const msPattern = /media_server\:\s(\d+)/
		// const jsPattern = /window\.\_gallery\s\=\sJSON\.parse\(\"(.*)\"/
		// const media_server = msPattern.exec(htmlContent)[1]
		// let jsdata = jsPattern.exec(htmlContent)[1]
		// jsdata = jsdata.replace(/\\u([\dA-Fa-f]{4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
		const { url } = await request.json()
		const media_server = 2
		let meta = JSON.parse(url)
		let Pages = meta.images.pages.map((e, i) => genMediaUrl(media_server, meta.media_id, i + 1, e.t))
		meta["pages"] = Pages
		Pages = Pages.map((e, i) => ({ img: e, num: i }))
		const utf8Bytes = new TextEncoder().encode(url);
		const binaryString = String.fromCharCode(...utf8Bytes);
		const bsnp = btoa(binaryString)
		const Komik = {
			id: meta.id,
			title: meta.title.english,
			japanese_title: meta.title.japanese,
			pretty_title: meta.title.pretty,
			images: bsnp,
			cover: meta.pages[0],
			upload_date: meta.upload_date,
			num_pages: meta.num_pages,
			num_favorites: meta.num_favorites,
			pages: {
				create: Pages,
			},
		}
		let Tags = []
		let TagsKomik = []
		for (let tag of meta.tags) {
			Tags.push({
				id: tag.id,
				type: tag.type,
				name: tag.name,
			})
			TagsKomik.push({
				komikId: meta.id,
				tagsId: tag.id,
			})
		}

		// console.log(Komik)
		// console.log(Tags)
		// console.log(TagsKomik)
		// console.log(Pages)

		await komikModel.add(Komik)
		await tagsModel.addBulk(Tags)
		await tagsKomikModel.addBulk(TagsKomik)

		// const ret = {
		// 	media_server: media_server,
		// 	jsdata: jsdata,
		// }
		const ret = {
			komik: Komik,
			tags: Tags,
			tk: TagsKomik
		}
		const data = {
			message: JSON.stringify(ret, null, 2),
			url: url,
		}
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: `${error.message}` }, { status: 500 })
	}
}
