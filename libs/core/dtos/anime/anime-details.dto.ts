import { AnimeDto } from './anime.dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

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
};
