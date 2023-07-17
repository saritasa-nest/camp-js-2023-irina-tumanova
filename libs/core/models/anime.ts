import { DateRange } from './dateRange';

export interface Anime {
	readonly id: number;
	readonly created: string;
	readonly modified: string;
	readonly titleEng: string;
	readonly titleJpn: string;
	readonly image: string;
	readonly aired: DateRange;
	readonly type: AnimeType;
	readonly status: AnimeStatus;
	readonly score: number | null;
	readonly userScore: number | null;
}

export enum AnimeType {
	TV = 'TV',
	OVA = 'OVA',
	Movie = 'Movie',
	Special = 'Special',
	ONA = 'ONA',
	Music = 'Music',
	Unknown = 'UNKNOWN',
}

export enum AnimeStatus {
	Airing = 'Airing',
	Finished = 'Finished',
	NotYetAired = 'Not yet aired',
}
