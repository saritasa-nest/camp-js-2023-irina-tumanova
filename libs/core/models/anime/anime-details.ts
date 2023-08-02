import { Anime } from './anime';
import { AnimeSource } from './anime-source';
import { Genre } from './genre';
import { Studio } from './studio';

/** Anime details. */
export class AnimeDetails extends Anime {

	/** Description. */
	public readonly description: string;

	/** Is this ongoing. */
	public readonly airing: boolean;

	/** Studios ids. */
	public readonly studios: readonly number[];

	/** Studios data. */
	public readonly studiosData: readonly Studio[];

	/** Genres ids. */
	public readonly genres: readonly number[];

	/** Genres data. */
	public readonly genresData: readonly Genre[];

	/** Trailer video id on youtube. */
	public readonly trailerYoutubeUrl: string | null;

	/** Age rating. */
	public readonly rating: AnimeRating;

	/** Source. */
	public readonly source: AnimeSource;

	/** Season. */
	public readonly season: string;

	public constructor(data: InitAnimeDetailsParams) {
		super(data);

		this.description = data.description;
		this.airing = data.airing;
		this.studios = data.studios;
		this.studiosData = data.studiosData;
		this.genres = data.genres;
		this.genresData = data.genresData;
		this.trailerYoutubeUrl = data.trailerYoutubeUrl;
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
