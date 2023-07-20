
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

/** Http error interceptor. */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

	/** @inheritdoc */
	public intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
		return next.handle(request)
			.pipe(
				retry(1),
				catchError((error: unknown) => {
					if (error instanceof HttpErrorResponse) {
						if (error.status === 0) {
							console.error('An error occurred:', error.error);
						} else {
							console.error(`Backend returned code ${error.status}, body was: `, error.error);
						}
					}

					return throwError(() => new Error('Something bad happened; please try again later.'));
				}),
			);
	}
}
