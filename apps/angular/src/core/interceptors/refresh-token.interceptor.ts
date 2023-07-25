import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, first, switchMap, throwError } from 'rxjs';
import { HttpStatusCode } from 'axios';

import { AppConfig } from '../services/app.config';
import { UserSecretService } from '../services/user-secret.service';
import { ApiUrlsConfig } from '../services/api-urls.config';
import { AuthService } from '../services/auth.service';

/** Refresh token interceptor. */
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

	private readonly appConfig = inject(AppConfig);

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

				return this.userSecretService.getTokens().pipe(
					first(),
					switchMap(tokens => {
						if (tokens !== null) {
							return this.authService.refreshSecret(tokens);
						}
						return throwError(() => error);
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
