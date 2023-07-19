import { SortDirection } from '@angular/material/sort';

import { ListParamsDto } from '../dtos/list-params.dto';
import { SortDirectionDto } from '../dtos/sort-direction.dto';
import { ListParams } from '../models/list-params';

export namespace ListParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model Params.
	 * @param filterMapper Mapper for filters in params.
	 */
	export function toDto<TFilters, TSortField, TFiltersDto>(model: ListParams<TFilters, TSortField>,
		filterMapper: (filters: TFilters) => TFiltersDto): ListParamsDto<TFiltersDto> {
		return {
			limit: model.limit,
			offset: model.limit * model.page,
			ordering: `${model.sorting.direction === 'desc' ? SortDirectionDto.Desc : SortDirectionDto.Asc}${model.sorting.field}`,
			...filterMapper(model.filters),
		};
	}
}
