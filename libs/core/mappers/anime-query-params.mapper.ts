import { AnimeQueryParamsDto, AnimeSortFieldDto } from '../dtos/anime-query-params-dto';
import { AnimeQueryParams, AnimeSortField } from '../models/anime-query-params';

import { ANIME_TYPE_TO_DTO } from './anime.mapper.';

export namespace AnimeQueryParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model Anime query params model.
	 */
	export function toDto(model: AnimeQueryParams): AnimeQueryParamsDto {
		return {
			limit: model.limit,
			offset: model.page * model.limit,
			ordering: `${model.sort.direction}${ANIME_SORT_FIELD_TO_DTO[model.sort.field]}`,
			type: model.type.map(type => ANIME_TYPE_TO_DTO[type]),
			search: model.search,
		};
	}
}

/** Anime sort field transformation object in dto. */
const ANIME_SORT_FIELD_TO_DTO = {
	[AnimeSortField.TitleEng]: AnimeSortFieldDto.TitleEng,
	[AnimeSortField.TitleJpn]: AnimeSortFieldDto.TitleJpn,
	[AnimeSortField.AiredStart]: AnimeSortFieldDto.AiredStart,
	[AnimeSortField.Status]: AnimeSortFieldDto.Status,
	[AnimeSortField.None]: AnimeSortField.None,
};
