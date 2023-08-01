import { DateRangeDto } from '../date-range.dto';

/** Anime DTO. */
export interface AnimeDto {

	/** ID. */
	readonly id: number;

	/**
	 * Creation date.
	 * @example 2023-07-18T10:32:17.881Z.
	 */
	readonly created: string;

	/**
	 * Modification date.
	 * @example 2023-07-18T10:32:17.881Z
	 */
	readonly modified: string;

	/** English title. */
	readonly title_eng: string;

	/** Japanese title. */
	readonly title_jpn: string;

	/** Image. */
	readonly image: string;

	/** Release period. */
	readonly aired: DateRangeDto;

	/** Type. */
	readonly type: AnimeTypeDto;

	/** Status. */
	readonly status: AnimeStatusDto;

	/** Score. */
	readonly score: number | null;

	/** User score. */
	readonly user_score: number | null;
}

/** Anime type DTO. */
export enum AnimeTypeDto {
	TV = 'TV',
	OVA = 'OVA',
	Movie = 'MOVIE',
	Special = 'SPECIAL',
	ONA = 'ONA',
	Music = 'MUSIC',
	Unknown = 'UNKNOWN',
}

/** Anime status DTO. */
export enum AnimeStatusDto {
	Airing = 'AIRING',
	Finished = 'FINISHED',
	NotYetAired = 'NOT_YET_AIRED',
	Unknown = 'UNKNOWN',
}
