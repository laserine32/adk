import { twMerge } from "tailwind-merge"
import clsx, { type ClassValue } from 'clsx'

export const  cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
}

export type paginationGenerated = Array<number | string>

export const generatePagination = (currentPage: number, totalPages: number): paginationGenerated => {
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

export const formatDateToLocal = (dateStr: string, locale: string = "id-ID"): string => {
  const date = new Date(dateStr)
	const options: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: "Asia/Jakarta",
	}
	const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(locale, options)
	return formatter.format(date)
}

export const unicodeToChar = (text: string): string => {
  return text.replace(/\\u[\dA-F]{4}/gi, (match: string): string => {
		const hex: string = match.replace(/\\u/g, '');
		return String.fromCharCode(parseInt(hex, 16));
	});
}

export const capitalizeFirstLetter = (text: unknown): string => {
	if (typeof text !== 'string') return '';
	return text.charAt(0).toUpperCase() + text.slice(1);
}

export const genMediaUrl = (
	sv: number | string,
	mid: number | string,
	nm: number | string,
	tp?: 'w' | 'j' | 'p' | string
): string => {
	let ext: string;

	if (tp === 'w') ext = 'webp';
	else if (tp === 'j') ext = 'jpg';
	else ext = 'png';

	return `https://i${sv}.nhentai.net/galleries/${mid}/${nm}.${ext}`;
}