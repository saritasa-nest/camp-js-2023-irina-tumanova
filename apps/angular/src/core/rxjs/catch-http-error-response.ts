import { Observable, catchError, throwError } from 'rxjs';
import { AppErrorsMapper } from '@js-camp/core/mappers/app-errors.mapper';
import { HttpErrorResponse } from '@angular/common/http';

/** Catch http error response. */
export function catchHttpErrorResponse(): <T>(source$: Observable<T>) => Observable<T> {
	return function<T>(source$: Observable<T>) {
		return source$.pipe(
			catchError((error: unknown) => {
				if (error instanceof HttpErrorResponse && error.error?.errors instanceof Array) {
					return throwError(() => AppErrorsMapper.fromDto(error));
				}
				return throwError(() => error);
			}),
		);
	};

}
