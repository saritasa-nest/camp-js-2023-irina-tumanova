import { AnimeTypeDto } from './anime.dto';

/** Filters params for getting anime dto. */
export interface AnimeFilterParamsDto {

	/** Selected anime types to display. */
	readonly type: readonly AnimeTypeDto[];

	/** Search. */
	readonly search: string;
}

/** Field to sort by. */
export enum AnimeSortingFieldDto {
	TitleEnglish = 'title_eng',
	TitleJapanese = 'title_jpn',
	AiredStart = 'aired__startswith',
	Status = 'status',
	None = '',
}
