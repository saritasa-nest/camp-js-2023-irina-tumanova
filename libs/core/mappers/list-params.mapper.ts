import { ListParamsDto } from '../dtos/list-params.dto';
import { SortDirectionDto } from '../dtos/sort-direction.dto';
import { ListParams } from '../models/list-params';

import { PaginationParamsMapper } from './pagination-params.mapper';

export namespace ListParamsMapper {

	/**
	 * Maps model to DTO.
	 * @param model Params.
	 * @param filterMapper Mapper for filters in params.
	 * @param sortingFieldMapper Mapper for sort field.
	 */
	export function toDto<TFilters, TSortField, TFiltersDto, TSortFieldDto>(model: ListParams<TFilters, TSortField>,
		filterMapper: (filters: TFilters) => TFiltersDto,
		sortingFieldMapper: (field: TSortField) => TSortFieldDto): ListParamsDto<TFiltersDto> {

		const sortDirection = model.sorting.direction === 'desc' ? SortDirectionDto.Desc : SortDirectionDto.Asc;
		return {
			ordering: `${sortDirection}${sortingFieldMapper(model.sorting.field)}`,
			...PaginationParamsMapper.toDto(model.pagination),
			...filterMapper(model.filters),
		};
	}
}
