import { AnimeFilterParamsDto, AnimeSortingFieldDto } from '../../dtos/anime/anime-filter-params.dto';
import { AnimeFilterParams, AnimeSortingField } from '../../models/anime/anime-params';

import { AnimeMapper } from './anime.mapper';

export namespace AnimeFilterParamsMapper {

	/**
	 * Maps model to DTO.
	 * @param model Anime query params model.
	 */
	export function toDto(model: AnimeFilterParams): AnimeFilterParamsDto {
		return {
			type__in: model.types.map(type => AnimeMapper.ANIME_TYPE_TO_DTO[type]).join(','),
			search: model.search,
		};
	}

	export const ANIME_SORT_FIELD_TO_DTO = {
		[AnimeSortingField.AiredStart]: AnimeSortingFieldDto.AiredStart,
		[AnimeSortingField.None]: AnimeSortingFieldDto.None,
		[AnimeSortingField.Status]: AnimeSortingFieldDto.Status,
		[AnimeSortingField.TitleEnglish]: AnimeSortingFieldDto.TitleEnglish,
		[AnimeSortingField.TitleJapanese]: AnimeSortingFieldDto.TitleJapanese,
	};
}
