import { DateRangeDto } from '../date-range.dto';

import { AnimeStatusDto, AnimeTypeDto } from './anime.dto';

export interface AnimeFormDataDto {

	/** Image. */
	readonly image: string | null;

	/** Trailer video id on youtube. */
	readonly trailer_youtube_id: string | null;

	/** English title. */
	readonly title_eng: string;

	/** Japanese title. */
	readonly title_jpn: string;

	/** Type. */
	readonly type: AnimeTypeDto | null;

	/** Status. */
	readonly status: AnimeStatusDto | null;

	/** Is this ongoing. */
	readonly airing: boolean;

	/** Release period. */
	readonly aired: DateRangeDto;

	/** Description. */
	readonly synopsis: string;

	/** Studios ids. */
	readonly studios: readonly number[];

	/** Genres ids. */
	readonly genres: readonly number[];
}
