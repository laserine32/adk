import type { NHTag } from './nhapi';

export interface ElmProps {
	title: string;
	data: NHTag[] | string;
	pathName?: string;
}
