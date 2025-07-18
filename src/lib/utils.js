import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export const generatePagination = (currentPage, totalPages) => {
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1)
	}

	if (currentPage <= 3) {
		return [1, 2, 3, "...", totalPages - 1, totalPages]
	}

	if (currentPage >= totalPages - 2) {
		return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages]
	}

	return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
}

export const formatDateToLocal = (dateStr, locale = "id-ID") => {
	const date = new Date(dateStr)
	const options = {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: "Asia/Jakarta",
	}
	const formatter = new Intl.DateTimeFormat(locale, options)
	return formatter.format(date)
}

export const unicodeToChar = (text) => {
	return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
		return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16))
	})
}

export const genMediaUrl = (sv, mid, nm, tp) => {
	if (tp == "w") tp = "webp"
	else if (tp == "j") tp = "jpg"
	else tp = "png"
	return `https://i${sv}.nhentai.net/galleries/${mid}/${nm}.${tp}`
}

export const capitalizeFirstLetter = (text) => {
	if (typeof text !== "string") {
		return ""
	}
	return text.charAt(0).toUpperCase() + text.slice(1)
}
