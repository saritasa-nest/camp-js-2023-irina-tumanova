import { DateRange } from '../date-range';

import { AnimeType } from './anime';
import { AnimeDetails, AnimeRating } from './anime-details';
import { AnimeSeason } from './anime-season';
import { AnimeSource } from './anime-source';
import { AnimeStatus } from './anime-status';

/** Anime form data (edit, create). */
export class AnimeFormData {

	/** Image. */
	public readonly imageUrl: string | null;

	/** Trailer video id on youtube. */
	public readonly trailerYoutubeId: string;

	/** English title. */
	public readonly titleEnglish: string;

	/** Japanese title. */
	public readonly titleJapanese: string;

	/** Type. */
	public readonly type: AnimeType | null;

	/** Status. */
	public readonly status: AnimeStatus | null;

	/** Is this ongoing. */
	public readonly airing: boolean;

	/** Release period. */
	public readonly aired: DateRange;

	/** Description. */
	public readonly description: string;

	/** Studios ids. */
	public readonly studios: readonly number[];

	/** Genres ids. */
	public readonly genres: readonly number[];

	/** Age rating. */
	public readonly rating: AnimeRating | null;

	/** Source. */
	public readonly source: AnimeSource | null;

	/** Season. */
	public readonly season: AnimeSeason | null;

	public constructor(data: InitAnimeFormDataParams) {
		const trailerUrlPath = data instanceof AnimeDetails ?
			(data.trailerYoutubeUrl ?? '').split('/') :
			[data.trailerYoutubeId];

		this.imageUrl = data.imageUrl;
		this.trailerYoutubeId = trailerUrlPath[trailerUrlPath.length - 1];
		this.titleEnglish = data.titleEnglish;
		this.titleJapanese = data.titleJapanese;
		this.type = data.type;
		this.status = data.status;
		this.airing = data.airing;
		this.aired = data.aired;
		this.description = data.description;
		this.studios = data.studios;
		this.genres = data.genres;
		this.rating = data.rating;
		this.source = data.source;
		this.season = data.season;
	}
}

type InitAnimeFormDataParams = AnimeFormData | AnimeDetails;
