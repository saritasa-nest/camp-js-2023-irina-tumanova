import { AnimeQueryParamsDto, AnimeSortFieldDto } from '../dtos/anime-query-params-dto';
import { AnimeTypeDto } from '../dtos/anime.dto';
import { AnimeType } from '../models/anime';
import { AnimeQueryParams, AnimeSortField } from '../models/anime-query-params';

/** Anime sort field transformation object in dto. */
const ANIME_SORT_FIELD_TO_DTO = {
	[AnimeSortField.TitleEng]: AnimeSortFieldDto.TitleEng,
	[AnimeSortField.TitleJpn]: AnimeSortFieldDto.TitleJpn,
	[AnimeSortField.AiredStart]: AnimeSortFieldDto.AiredStart,
	[AnimeSortField.Status]: AnimeSortFieldDto.Status,
	[AnimeSortField.None]: AnimeSortField.None,
};

/** Anime type transformation object in dto. */
export const ANIME_TYPE_TO_DTO = {
	[AnimeType.TV]: AnimeTypeDto.TV,
	[AnimeType.OVA]: AnimeTypeDto.OVA,
	[AnimeType.Movie]: AnimeTypeDto.Movie,
	[AnimeType.Special]: AnimeTypeDto.Special,
	[AnimeType.ONA]: AnimeTypeDto.ONA,
	[AnimeType.Music]: AnimeTypeDto.Music,
	[AnimeType.Unknown]: AnimeTypeDto.Unknown,
};

export namespace AnimeQueryParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model Anime query params model.
	 */
	export function toDto(model: AnimeQueryParams): AnimeQueryParamsDto {
		return {
			limit: model.limit,
			offset: model.page * model.limit,
			ordering: `${model.sorting.direction}${ANIME_SORT_FIELD_TO_DTO[model.sorting.field]}`,
			type: model.type.map(type => ANIME_TYPE_TO_DTO[type]),
			search: model.search,
		};
	}
}
