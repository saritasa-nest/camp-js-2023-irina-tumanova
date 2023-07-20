import { ListParamsDto } from '../dtos/list-params.dto';
import { SortDirectionDto } from '../dtos/sort-direction.dto';
import { ListParams } from '../models/list-params';

export namespace ListParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model Params.
	 * @param filterMapper Mapper for filters in params.
	 * @param sortFieldMapper Mapper for sort field.
	 */
	export function toDto<TFilters, TSortField, TFiltersDto, TSortFieldDto>(model: ListParams<TFilters, TSortField>,
		filterMapper: (filters: TFilters) => TFiltersDto,
		sortFieldMapper: (field: TSortField) => TSortFieldDto): ListParamsDto<TFiltersDto> {

		const sortDirection = model.sorting.direction === 'desc' ? SortDirectionDto.Desc : SortDirectionDto.Asc;
		const ordering = model.sorting.direction === '' ? '' : `${sortDirection}${sortFieldMapper(model.sorting.field)}`;
		return {
			limit: model.limit,
			offset: model.limit * model.page,
			ordering,
			...filterMapper(model.filters),
		};
	}
}
