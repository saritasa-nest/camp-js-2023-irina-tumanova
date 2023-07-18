import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';
import { Observable } from 'rxjs';

/** Api key interceptor. */
@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

	/**
	 * Intercept.
	 * @param req Request.
	 * @param next Next handler.
	 */
	public intercept<TData>(req: HttpRequest<TData>, next: HttpHandler): Observable<HttpEvent<TData>> {
		const modifiedReq = req.clone({
			headers: req.headers.set('Api-Key', environment.apiKey),
		});
		return next.handle(modifiedReq);
	}
}
