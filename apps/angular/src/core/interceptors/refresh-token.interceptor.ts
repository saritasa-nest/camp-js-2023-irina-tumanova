import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, first, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { HttpStatusCode } from 'axios';
import { AppError } from '@js-camp/core/models/app-error';

import { UserSecretService } from '../services/user-secret.service';
import { ApiUrlsConfig } from '../services/api-urls.config';
import { AuthService } from '../services/auth.service';

/** Refresh token interceptor. */
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

	/** Active request for token refresh. */
	private refreshSecretRequest$: Observable<void> | null = null;

	private readonly userSecretService = inject(UserSecretService);

	private readonly apiUrlsConfig = inject(ApiUrlsConfig);

	private readonly authService = inject(AuthService);

	/**
	 * Intercept.
	 * @param req Request.
	 * @param next Next handler.
	 */
	public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (!this.shouldRefreshTokenForUrl(req.url)) {
			return next.handle(req);
		}

		return next.handle(req).pipe(
			catchError((error: unknown) => {
				if (this.shouldHttpErrorBeIgnored(error)) {
					return throwError(() => error);
				}

				this.refreshSecretRequest$ ??= this.userSecretService.getTokens().pipe(
					shareReplay({ refCount: true, bufferSize: 1 }),
					first(),
					switchMap(tokens => {
						if (tokens !== null) {
							return this.authService.refreshSecret(tokens);
						}
						return throwError(() => new AppError({ message: 'Unauthorized' }));
					}),
				);

				return this.refreshSecretRequest$.pipe(
					tap(() => {
						this.refreshSecretRequest$ = null;
					}),
					switchMap(() => next.handle(req)),
				);
			}),
		);
	}

	/**
	 * Checks if tokens need to be validated.
	 * @param url - Request url.
	 */
	private shouldRefreshTokenForUrl(url: string): boolean {
		return this.apiUrlsConfig.isAppUrl(url) && !this.apiUrlsConfig.isAuthUrl(url);
	}

	/**
	 * Checks if the error should be ignored.
	 * @param error - Request error.
	 */
	private shouldHttpErrorBeIgnored(error: unknown): boolean {
		if (error instanceof HttpErrorResponse) {
			return error.status !== HttpStatusCode.Unauthorized;
		}
		return true;
	}

}
