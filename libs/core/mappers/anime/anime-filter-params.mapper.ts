import { AnimeFilterParamsDto, AnimeSortingFieldDto } from '../../dtos/anime/anime-filter-params.dto';
import { AnimeFilterParams } from '../../models/anime/anime-params';
import { AnimeFormDataMapper } from './anime-form-data.mapper';
import { AnimeSortingField } from '../../models/anime/anime-sort';

export namespace AnimeFilterParamsMapper {

	/**
	 * Maps model to DTO.
	 * @param model Anime query params model.
	 */
	export function toDto(model: AnimeFilterParams): AnimeFilterParamsDto {
		return {
			type__in: model.types.map(type => AnimeFormDataMapper.ANIME_TYPE_TO_DTO[type]).join(','),
			search: model.search,
		};
	}

	export const ANIME_SORT_FIELD_TO_DTO = {
		[AnimeSortingField.Status]: AnimeSortingFieldDto.Status,
		[AnimeSortingField.TitleEnglish]: AnimeSortingFieldDto.TitleEnglish,
	};
}
