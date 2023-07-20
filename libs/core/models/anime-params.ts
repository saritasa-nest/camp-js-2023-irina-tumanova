import { AnimeType } from './anime';
import { ListParams } from './list-params';

/** Filters parameters for getting anime. */
export interface AnimeFilterParams {

	/** Selected anime types to display. */
	readonly type: AnimeType[];

	/** Search. */
	readonly search: string;
}

/** Field to sort by. */
export enum AnimeSortingField {
	TitleEnglish = 'titleEnglish',
	TitleJapanese = 'titleJapanese',
	AiredStart = 'aired.start',
	Status = 'status',
	None = '',
}

/** Request parameters for getting anime. */
export type AnimeParams = ListParams<AnimeFilterParams, AnimeSortingField>;
