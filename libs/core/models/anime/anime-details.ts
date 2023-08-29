import { Anime } from './anime';
import { AnimeSeason } from './anime-season';
import { AnimeSource } from './anime-source';
import { Genre } from '../genre/genre';
import { Studio } from '../studio/studio';

/** Anime details. */
export class AnimeDetails extends Anime {
	/** Description. */
	public readonly description: string;

	/** Is this ongoing. */
	public readonly airing: boolean;

	/** Studios. */
	public readonly studios: readonly Studio[];

	/** Genres. */
	public readonly genres: readonly Genre[];

	/** Trailer video id on youtube. */
	public readonly trailerYoutubeId: string | null;

	/** Age rating. */
	public readonly rating: AnimeRating;

	/** Source. */
	public readonly source: AnimeSource;

	/** Season. */
	public readonly season: AnimeSeason;

	public constructor(data: InitAnimeDetailsParams) {
		super(data);

		this.description = data.description;
		this.airing = data.airing;
		this.studios = data.studios;
		this.studios = data.studios;
		this.genres = data.genres;
		this.trailerYoutubeId = data.trailerYoutubeId;
		this.source = data.source;
		this.rating = data.rating;
		this.season = data.season;
	}
}

/** Anime rating. */
export enum AnimeRating {
	G = 'G',
	PG = 'PG',
	PG13 = 'PG-13',
	R17 = 'R-17',
	RPlus = 'R-PLUS',
	PX = 'R-X',
	Unknown = 'Unknown',
}

type InitAnimeDetailsParams = AnimeDetails;
