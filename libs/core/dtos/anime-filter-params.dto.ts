import { AnimeType } from './anime.dto';

/** Filters params for getting anime dto. */
export interface AnimeFilterParamsDto {

	/** Selected anime types to display. */
	readonly type: readonly AnimeType[];

	/** Search. */
	readonly search: string;
}
