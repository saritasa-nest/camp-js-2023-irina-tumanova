import { Observable, catchError, of, throwError } from 'rxjs';
import { AppErrors } from '@js-camp/core/models/app-error';
import { AppErrorsMapper } from '@js-camp/core/mappers/app-errors.mapper';
import { HttpErrorResponse } from '@angular/common/http';

/** Catch http error response. */
export function catchHttpErrorResponse(): <T>(source$: Observable<T>) => Observable<AppErrors | T> {
	return function<T>(source$: Observable<T>) {
		return source$.pipe(
			catchError((error: unknown) => {
				if (error instanceof HttpErrorResponse && error.error.errors instanceof Array) {
					return of(AppErrorsMapper.fromDto(error.error.errors));
				}
				return throwError(() => error);
			}),
		);
	};

}
