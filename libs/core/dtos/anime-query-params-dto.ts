import { AnimeTypeDto } from './anime.dto';

export interface AnimeQueryParamsDto {
	limit: number;
	offset: number;
	ordering: string;
	type: AnimeTypeDto[];
	search: string;
}

export enum AnimeSortFieldDto {
	TitleEng = 'title_eng',
	TitleJpn = 'title_jpn',
	AiredStart = 'aired__startswith',
	Status = 'status',
	None = '',
}
