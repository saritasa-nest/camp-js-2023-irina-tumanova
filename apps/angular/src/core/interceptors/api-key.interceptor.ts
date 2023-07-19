import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfig } from '../services/app.config';

/** Api key interceptor. */
@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

	public constructor(private readonly appConfig: AppConfig) {}

	/**
	 * Intercept.
	 * @param req Request.
	 * @param next Next handler.
	 */
	public intercept<TData>(req: HttpRequest<TData>, next: HttpHandler): Observable<HttpEvent<TData>> {
		const modifiedReq = req.clone({
			headers: req.headers.set('Api-Key', this.appConfig.apiKey),
		});
		return next.handle(modifiedReq);
	}
}
