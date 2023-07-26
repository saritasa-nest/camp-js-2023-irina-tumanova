import { SortDirection } from '@angular/material/sort';

import { PaginationParams } from '../models/pagination-params';
import { QueryParamsOf } from '../models/query-params-of';
import { Sorting } from '../models/sorting';

export namespace QueryParamsOfMapper{

	/**
	 * Map query params to pagination params.
	 * @param queryParams Query params.
	 * @param defaultParams Default pagination params.
	 */
	export function toPaginationParams<T extends PaginationParams>(queryParams: QueryParamsOf<T>, defaultParams: PaginationParams):
	PaginationParams {
		return new PaginationParams({
			pageSize: mapQueryParamToNumberParam(defaultParams.pageSize, queryParams.pageSize),
			pageNumber: mapQueryParamToNumberParam(defaultParams.pageNumber, queryParams.pageNumber),
		});
	}

	/**
	 * Map query params to sorting.
	 * @param queryParams Query params.
	 * @param defaultParams Default sorting.
	 */
	export function toSorting<TField, TQuery extends Sorting<TField>>(queryParams: QueryParamsOf<TQuery>, defaultParams: Sorting<TField>):
	Sorting<TField> {
		return new Sorting({
			direction: queryParams.direction as SortDirection ?? defaultParams.direction,
			field: queryParams.field as TField ?? defaultParams.field,
		});
	}

	/**
	 * Map query param to number param.
	 * @param defaultValue Default number value.
	 * @param param Query param.
	 */
	function mapQueryParamToNumberParam(defaultValue: number, param?: string): number {
		return param !== undefined ? Number.parseInt(param, 10) : defaultValue;
	}
}
