import { ListParamsDto } from '../dtos/list-params.dto';
import { SortDirectionDto } from '../dtos/sort-direction.dto';
import { ListParams } from '../models/list-params';

import { PaginationParamsMapper } from './pagination-params.mapper';

export namespace ListParamsMapper {

	/**
	 * Maps model to DTO.
	 * @param model Params.
	 * @param filterMapper Mapper for filters in params.
	 */
	export function toDto<TFilters, TSortField, TFiltersDto>(model: ListParams<TFilters, TSortField>,
		filterMapper: (filters: TFilters) => TFiltersDto): ListParamsDto<TFiltersDto> {
		return {
			ordering: `${model.sorting.direction === 'desc' ? SortDirectionDto.Desc : SortDirectionDto.Asc}${model.sorting.field}`,
			...PaginationParamsMapper.toDto(model.pagination),
			...filterMapper(model.filters),
		};
	}
}
