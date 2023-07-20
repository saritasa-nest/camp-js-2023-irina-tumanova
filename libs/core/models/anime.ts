import { AnimeStatus } from './anime-status';

import { DateRange } from './date-range';

/** Anime. */
export interface Anime {

	/** ID. */
	readonly id: number;

	/** Creation date. */
	readonly created: Date;

	/** Modification date. */
	readonly modified: Date;

	/** English title. */
	readonly titleEnglish: string;

	/** Japanese title. */
	readonly titleJapanese: string;

	/** Image. */
	readonly image: string;

	/** Release period. */
	readonly aired: DateRange;

	/** Type. */
	readonly type: AnimeType;

	/** Status. */
	readonly status: AnimeStatus;

	/** Score. */
	readonly score: number | null;

	/** User score. */
	readonly userScore: number | null;
}

/** Anime type dto. */
export enum AnimeType {
	TV = 'TV',
	OVA = 'OVA',
	Movie = 'Movie',
	Special = 'Special',
	ONA = 'ONA',
	Music = 'Music',
	Unknown = 'Unknown',
}
