import { GenreFilterParamsDto, GenreSortingFieldDto } from '@js-camp/core/dtos/genre/genre-filter.dto';

import { GenreFilterParams, GenreSortingField } from '@js-camp/core/models/genre/genre-params';
import { GenreType } from '@js-camp/core/models/genre/genre-type';
import { GenreMapper } from './genre.mapper';

export namespace GenreFilterParamsMapper {
	/**
	 * Maps model to DTO.
	 * @param model Genre query params model.
	 */
	export function toDto(model: GenreFilterParams): GenreFilterParamsDto {
		return {
			type__in: model.types.map((type) => GenreMapper.GENRE_TYPE_TO_DTO[type]).join(','),
			search: model.search,
		};
	}

	export const GENRE_SORT_FIELD_TO_DTO = {
		[GenreSortingField.None]: GenreSortingFieldDto.None,
		[GenreSortingField.Name]: GenreSortingFieldDto.Name,
		[GenreSortingField.Type]: GenreSortingFieldDto.Type,
	};
}
