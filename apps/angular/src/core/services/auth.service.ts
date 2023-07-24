import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { TokenDto } from '@js-camp/core/dtos/auth/token.dto';
import { TokenMapper } from '@js-camp/core/mappers/auth/token.mapper';
import { Register } from '@js-camp/core/models/auth/register';
import { LoginMapper } from '@js-camp/core/mappers/auth/login.mapper';
import { RegisterMapper } from '@js-camp/core/mappers/auth/register.mapper';
import { Login } from '@js-camp/core/models/auth/login';

import { AppUrlsConfig } from './app-urls.config';

/** Auth service. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {

	private readonly http = inject(HttpClient);

	private readonly appUrlsConfig = inject(AppUrlsConfig);

	/**
	 * Handle login.
	 * @param credentials Login credentials.
	 */
	public login(credentials: Login): Observable<void> {
		const url = this.appUrlsConfig.auth.login;
		return this.http
			.post<TokenDto>(url, LoginMapper.toDto(credentials))
			.pipe(
				map(tokens => TokenMapper.fromDto(tokens)),
				switchMap(tokens => console.log(tokens)),
			);
	}

	/**
	 * Handle register.
	 * @param credentials Register credentials.
	 */
	public register(credentials: Register): Observable<void> {
		const url = this.appUrlsConfig.auth.register;
		return this.http
			.post<TokenDto>(url, RegisterMapper.toDto(credentials))
			.pipe(
				map(tokens => TokenMapper.fromDto(tokens)),
				switchMap(tokens => console.log(tokens)),
			);
	}
}
