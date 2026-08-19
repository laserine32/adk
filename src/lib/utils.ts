import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';

export const cn = (...inputs: ClassValue[]): string => {
	return twMerge(clsx(inputs));
};

export type paginationGenerated = Array<number | string>;

export const generatePagination = (
	currentPage: number,
	totalPages: number
): paginationGenerated => {
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}
	if (currentPage < 3) {
		return [1, 2, 3, '...', totalPages - 2, totalPages - 1, totalPages];
	}
	if (currentPage > totalPages - 2) {
		return [1, 2, 3, '...', totalPages - 2, totalPages - 1, totalPages];
	}
	if (currentPage == 3) {
		return [1, 2, currentPage, currentPage + 1, currentPage + 2, '...', totalPages];
	}
	if (currentPage == totalPages - 2) {
		return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
	}
	return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

export const formatDateToLocal = (dateStr: string, locale: string = 'id-ID'): string => {
	const date = new Date(dateStr);
	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		timeZone: 'Asia/Jakarta'
	};
	const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(locale, options);
	return formatter.format(date);
};

export const unicodeToChar = (text: string): string => {
	if (!text) {
		return ``;
	}
	return text.replace(/\\u[\dA-F]{4}/gi, (match: string): string => {
		const hex: string = match.replace(/\\u/g, '');
		return String.fromCharCode(parseInt(hex, 16));
	});
};

export const capitalizeFirstLetter = (text: unknown): string => {
	if (typeof text !== 'string') return '';
	return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getRandomInt = (min: number, max: number): number => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function formatStringTimeAgo(dateString: string): string {
	const unixTimestamp = Math.floor(new Date(dateString).getTime() / 1000);
	return formatUnixTimeAgo(`${unixTimestamp}`);
}

export function formatUnixTimeAgo(unixTimeStr: string): string {
	const unixSeconds = parseInt(unixTimeStr, 10);
	if (isNaN(unixSeconds)) {
		throw new Error('Invalid UNIX time string');
	}

	const date = new Date(unixSeconds * 1000);
	const now = new Date();

	let diffMs = now.getTime() - date.getTime();
	if (diffMs < 0) diffMs = 0; // Menangani tanggal di masa depan (opsional)

	// Kalkulasi total selisih untuk setiap satuan waktu
	const diffSeconds = Math.floor(diffMs / 1000);
	const diffMinutes = Math.floor(diffSeconds / 60);
	const diffHours = Math.floor(diffMinutes / 60);
	const diffDays = Math.floor(diffHours / 24);
	const diffWeeks = Math.floor(diffDays / 7);
	const diffMonths = Math.floor(diffDays / 30); // Pendekatan 1 bulan = 30 hari
	const diffYears = Math.floor(diffDays / 365); // Pendekatan 1 tahun = 365 hari

	// eslint-disable-next-line no-useless-assignment
	let timeAgo = '';

	// Evaluasi dari unit terbesar ke terkecil
	if (diffYears > 0) {
		timeAgo = `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
	} else if (diffMonths > 0) {
		timeAgo = `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
	} else if (diffWeeks > 0) {
		timeAgo = `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
	} else if (diffDays > 0) {
		timeAgo = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
	} else if (diffHours > 0) {
		timeAgo = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
	} else if (diffMinutes > 0) {
		timeAgo = `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
	} else {
		timeAgo = 'just now';
	}

	// Format tanggal (MM/DD/YYYY)
	const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

	// Jika "just now", bisa diputuskan apakah tetap ingin menampilkan tanggal absolutnya
	return `${timeAgo} (${formattedDate})`;
}

export function isMobile(): boolean {
	const MOBILE_BREAKPOINT: number = 768;
	if (typeof window === 'undefined') return false;
	return window.innerWidth < MOBILE_BREAKPOINT;
}
