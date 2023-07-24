import { AnimeTypeDto } from './anime.dto';

/** Filters params for getting anime DTO. */
export interface AnimeFilterParamsDto {

	/** Anime types. */
	readonly type: readonly AnimeTypeDto[];

	/** Search. */
	readonly search: string;
}
