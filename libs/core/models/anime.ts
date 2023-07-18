import { AnimeStatus, AnimeType } from '../dtos/anime.dto';

import { DateRange } from './date-range';

/** Anime data. */
export interface Anime {

	/** Anime id. */
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
