import { ListParamsDto } from '../dtos/list-params.dto';
import { SortDirectionDto } from '../dtos/sort-direction.dto';
import { ListParams } from '../models/list-params';
import { SortDirection } from '../models/sorting';
import { PaginationParamsMapper } from './pagination-params.mapper';

export namespace ListParamsMapper {

	/**
	 * Maps model to DTO.
	 * @param model Params.
	 * @param filterMapper Mapper for filters in params.
	 * @param sortingFieldMapper Mapper for sort field.
	 */
	export function toDto<TFilters, TSortField, TFiltersDto, TSortFieldDto>(
		model: ListParams<TFilters, TSortField>,
		filterMapper: (filters: TFilters) => TFiltersDto,
		sortingFieldMapper: (field: TSortField) => TSortFieldDto,
	): ListParamsDto<TFiltersDto> {
		return {
			ordering: model.sorting
				.map(sortField => sortField.direction === SortDirection.None ? null :
					`${SORT_DIRECTION_TO_DTO[sortField.direction]}${sortingFieldMapper(sortField.field)}`)
				.filter(element => element !== null)
				.join(','),

			...PaginationParamsMapper.toDto(model.pagination),
			...filterMapper(model.filters),
		};
	}

	export const SORT_DIRECTION_TO_DTO = {
		[SortDirection.Asc]: SortDirectionDto.Asc,
		[SortDirection.Desc]: SortDirectionDto.Desc,
	};
}
