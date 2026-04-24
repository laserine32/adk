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

export const getRandomInt = (min: number, max: number): number =>{
	min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatUnixTimeAgo(unixTimeStr: string): string {
  const unixSeconds = parseInt(unixTimeStr, 10);
  if (isNaN(unixSeconds)) {
    throw new Error("Invalid UNIX time string");
  }

  const date = new Date(unixSeconds * 1000);
  const now = new Date();

  let diffMs = now.getTime() - date.getTime();
  if (diffMs < 0) diffMs = 0;

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const timeAgoParts: string[] = [];

  if (hours > 0) {
    timeAgoParts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  }
  if (minutes > 0) {
    timeAgoParts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  }

  if (timeAgoParts.length === 0) {
    timeAgoParts.push("just now");
  }

  const timeAgo = timeAgoParts.join(", ") + " ago";

  // Format tanggal (MM/DD/YYYY)
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  return `${timeAgo} (${formattedDate})`;
}