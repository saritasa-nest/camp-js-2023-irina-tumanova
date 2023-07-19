import { AnimeType } from '../dtos/anime.dto';

import { AnimeStatus } from './anime-status';

import { DateRange } from './date-range';

/** Anime data. */
export interface Anime {

	/** Anime id. */
	readonly id: number;

	/** Anime creation date. */
	readonly created: Date;

	/** Anime modification date. */
	readonly modified: Date;

	/** English anime title. */
	readonly titleEnglish: string;

	/** Japanese anime title. */
	readonly titleJapanese: string;

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
