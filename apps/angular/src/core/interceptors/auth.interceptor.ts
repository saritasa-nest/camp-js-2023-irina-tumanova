import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, first, map, switchMap } from 'rxjs';

import { UserSecret } from '@js-camp/core/models/auth/user-secret';

import { UserSecretService } from '../services/user-secret.service';
import { ApiUrlsConfig } from '../services/api-urls.config';

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_SECRET_PREFIX = 'Bearer';

/** Auth interceptor. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	private readonly userSecretService = inject(UserSecretService);

	private readonly apiUrlsConfig = inject(ApiUrlsConfig);

	/**
	 * Intercept.
	 * @param req Request.
	 * @param next Next handler.
	 */
	public intercept<TData>(req: HttpRequest<TData>, next: HttpHandler): Observable<HttpEvent<TData>> {
		if (this.shouldInterceptToken(req.url)) {
			const userSecret$ = this.userSecretService.getTokens().pipe(first());

			return userSecret$.pipe(
				map(userSecret =>
					userSecret === null ?
						req :
						req.clone({
							headers: this.appendAuthorizationHeader(
								req.headers,
								userSecret,
							),
						})),
				switchMap(newReq => next.handle(newReq)),
			);
		}
		return next.handle(req);
	}

	/**
	 * Checks if tokens need to be validated.
	 * @param url - Request url.
	 */
	private shouldInterceptToken(url: string): boolean {
		return this.apiUrlsConfig.isAppUrl(url);
	}

	/**
	 * Appends authorization header.
	 * @param headers Headers list.
	 * @param userSecret User secret.
	 */
	private appendAuthorizationHeader(
		headers: HttpHeaders,
		userSecret: UserSecret,
	): HttpHeaders {
		return headers.set(AUTH_HEADER_KEY, `${AUTH_SECRET_PREFIX} ${userSecret.access}`);
	}
}
