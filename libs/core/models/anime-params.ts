import { AnimeType } from './anime';
import { ListParams } from './list-params';

/** Filters parameters for getting anime. */
export class AnimeFilterParams {

	/** Anime types. */
	public readonly type: AnimeType[];

	/** Search. */
	public readonly search: string;

	public constructor({ type, search }: InitAnimeFilterParams) {
		this.type = type;
		this.search = search;
	}
}

type InitAnimeFilterParams = AnimeFilterParams;

/** Field to sort by. */
export enum AnimeSortField {
	TitleEng = 'title_eng',
	TitleJpn = 'title_jpn',
	AiredStart = 'aired__startswith',
	Status = 'status',
	None = '',
}

/** Request parameters for getting anime. */
export type AnimeParams = ListParams<AnimeFilterParams, AnimeSortField>;
