import { Injectable } from '@angular/core';
import { QueryParamsOf } from '@js-camp/core/models/query-params-of';

/** Query params service. */
@Injectable({
	providedIn: 'root',
})
export class QueryParamsService {

	/**
	 * Map query params to url.
	 * @param queryParams Params.
	 * @param urlKey Url key.
	 */
	public mapQueryParamsToUrl<TParams extends Record<string, string>>(queryParams: QueryParamsOf<TParams>,
		urlKey: keyof TParams): string {
		return decodeURIComponent(queryParams[urlKey] ?? '');
	}
}
