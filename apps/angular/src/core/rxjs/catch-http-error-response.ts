import { Observable, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { AppErrorDictionaryMapper } from '@js-camp/core/mappers/app-error.mapper';
import { ValidationMapper } from '@js-camp/core/models/app-error';

/**
 * Catch http error response.
 * @param validationMapper Validation mapper from form.
 */
export function catchHttpErrorResponse<TErrors extends object>(validationMapper: ValidationMapper<TErrors>):
<T>(source$: Observable<T>) => Observable<T> {
	return function<T>(source$: Observable<T>) {
		return source$.pipe(
			catchError((error: unknown) => {
				if (error instanceof HttpErrorResponse && error.error?.errors instanceof Array) {
					return throwError(() => AppErrorDictionaryMapper.fromDto(error.error.errors, validationMapper));
				}
				return throwError(() => error);
			}),
		);
	};
}
