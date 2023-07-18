import { DateRangeDto } from './dateRangeDto';

/** Anime data dto. */
export interface AnimeDto {

	/** Anime's id. */
	readonly id: number;

	/** Anime creation date. */
	readonly created: string;

	/** Anime modification date. */
	readonly modified: string;

	/** English anime title. */
	readonly title_eng: string;

	/** Japanese anime title. */
	readonly title_jpn: string;

	/** Anime image. */
	readonly image: string;

	/** Anime release period. */
	readonly aired: DateRangeDto;

	/** Anime type. */
	readonly type: AnimeTypeDto;

	/** Anime status. */
	readonly status: AnimeStatusDto;

	/** Anime score. */
	readonly score: number | null;

	/** Anime user score. */
	readonly user_score: number | null;
}

/** Anime type dto. */
export enum AnimeTypeDto {
	TV = 'TV',
	OVA = 'OVA',
	Movie = 'MOVIE',
	Special = 'SPECIAL',
	ONA = 'ONA',
	Music = 'MUSIC',
	Unknown = 'UNKNOWN',
}

/** Anime status dto. */
export enum AnimeStatusDto {
	Airing = 'AIRING',
	Finished = 'FINISHED',
	NotYetAired = 'NOT_YET_AIRED',
}
