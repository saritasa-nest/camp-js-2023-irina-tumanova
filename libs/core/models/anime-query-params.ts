import { AnimeType } from './anime';

export interface AnimeQueryParams {
	limit: number;
	page: number;
	sort: AnimeSort;
	type: AnimeType[];
	search: string;
}

export interface AnimeSort{
	field: AnimeSortField;
	direction: AnimeSortDirection;
}

export type AnimeSortDirection = '' | '-';

export enum AnimeSortField {
	TitleEng = 'titleEng',
	TitleJpn = 'titleJpn',
	AiredStart = 'airedStart',
	Status = 'status',
	None = '',
}
