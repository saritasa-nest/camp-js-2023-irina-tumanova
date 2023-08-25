import { GenreSortingField } from '../../../core/models/genre/genre-sort';
import { GenreFilterParamsDto, GenreSortingFieldDto } from '../../../core/dtos/genre/genre-filter.dto';
import { GenreFilterParams } from '../../../core/models/genre/genre-params';
import { GenreMapper } from './genre.mapper';

export namespace GenreFilterParamsMapper {

	/**
	 * Maps model to DTO.
	 * @param model Genre query params model.
	 */
	export function toDto(model: GenreFilterParams): GenreFilterParamsDto {
		return {
			type__in: model.types.map(type => GenreMapper.GENRE_TYPE_TO_DTO[type]).join(','),
			search: model.search,
		};
	}

	export const GENRE_SORT_FIELD_TO_DTO: Record<GenreSortingField, GenreSortingFieldDto> = {
		[GenreSortingField.None]: GenreSortingFieldDto.None,
		[GenreSortingField.Name]: GenreSortingFieldDto.Name,
		[GenreSortingField.Type]: GenreSortingFieldDto.Type,
	};
}
