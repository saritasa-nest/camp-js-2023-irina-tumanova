import { AnimeDto } from './anime.dto';
import { GenreDto } from '../genre/genre.dto';
import { StudioDto } from '../studio/studio.dto';

/** Anime details DTO. */
export type AnimeDetailsDto = AnimeDto & {

	/** Description. */
	readonly synopsis: string;

	/** Is this ongoing. */
	readonly airing: boolean;

	/** Studios ids. */
	readonly studios: readonly number[];

	/** Studios data. */
	readonly studios_data: readonly StudioDto[];

	/** Genres ids. */
	readonly genres: readonly number[];

	/** Genres data. */
	readonly genres_data: readonly GenreDto[];

	/** Trailer video id on youtube. */
	readonly trailer_youtube_id: string | null;

	/** Age rating. */
	readonly rating: AnimeRatingDto;

	/** Source. */
	readonly source: AnimeSourceDto;

	/** Season. */
	readonly season: AnimeSeasonDto;
};

/** Anime rating DTO. */
export enum AnimeRatingDto {
	G = 'G',
	PG = 'PG',
	PG13 = 'PG_13',
	R17 = 'R_17',
	RPlus = 'R_PLUS',
	PX = 'R_X',
	Unknown = 'UNKNOWN',
}

/** Anime source DTO. */
export enum AnimeSourceDto {
	FourKomaMang = 'FOUR_KOMA_MANGA',
	Book = 'BOOK',
	CardGame = 'CARD_GAME',
	LightNovel = 'LIGHT_NOVEL',
	Manga = 'MANGA',
	MixedMedia = 'MIXED_MEDIA',
	Music = 'MUSIC',
	Novel = 'NOVEL',
	Original = 'ORIGINAL',
	PictureBook = 'PICTURE_BOOK',
	Radio = 'RADIO',
	VisualNovel = 'VISUAL_NOVEL',
	WebManga = 'WEB_MANGA',
	WebNovel = 'WEB_NOVEL',
	Other = 'OTHER',
	Unknown = 'UNKNOWN',
	Game = 'GAME',
}

/** Anime season DTO. */
export enum AnimeSeasonDto {
	Summer = 'SUMMER',
	Winter = 'WINTER',
	Spring = 'SPRING',
	Fall = 'FALL',
	NonSeasonal = 'NON_SEASONAL',
}
