import { DateRange } from './dateRange';

/** Anime data. */
export interface Anime {

	/** Anime's id. */
	readonly id: number;

	/** Anime creation date. */
	readonly created: string;

	/** Anime modification date. */
	readonly modified: string;

	/** English anime title. */
	readonly titleEng: string;

	/** Japanese anime title. */
	readonly titleJpn: string;

	/** Anime image. */
	readonly image: string;

	/** Anime release period. */
	readonly aired: DateRange;

	/** Anime type. */
	readonly type: AnimeType;

	/** Anime status. */
	readonly status: AnimeStatus;

	/** Anime score. */
	readonly score: number | null;

	/** Anime user score. */
	readonly userScore: number | null;
}

/** Anime type. */
export enum AnimeType {
	TV = 'TV',
	OVA = 'OVA',
	Movie = 'Movie',
	Special = 'Special',
	ONA = 'ONA',
	Music = 'Music',
	Unknown = 'UNKNOWN',
}

/** Anime status. */
export enum AnimeStatus {
	Airing = 'Airing',
	Finished = 'Finished',
	NotYetAired = 'Not yet aired',
}
