import { AnimeStatus } from '../models/anime-status';

import { DateRangeDto } from './date-range.dto';

/** Anime data dto. */
export interface AnimeDto {

	/** Anime id. */
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
	readonly type: AnimeType;

	/** Anime status. */
	readonly status: AnimeStatus;

	/** Anime score. */
	readonly score: number | null;

	/** Anime user score. */
	readonly user_score: number | null;
}

/** Anime type dto. */
export enum AnimeType {
	TV = 'TV',
	OVA = 'OVA',
	Movie = 'MOVIE',
	Special = 'SPECIAL',
	ONA = 'ONA',
	Music = 'MUSIC',
	Unknown = 'UNKNOWN',
}
