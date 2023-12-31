import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, concat, distinctUntilChanged, first, map, merge, switchMap, tap, throwError } from 'rxjs';

import { UserSecretDto } from '@js-camp/core/dtos/auth/user-secret.dto';
import { UserSecretMapper } from '@js-camp/core/mappers/auth/user-secret.mapper';
import { Registration } from '@js-camp/core/models/auth/registration';
import { LoginMapper } from '@js-camp/core/mappers/auth/login.mapper';
import { RegistrationMapper } from '@js-camp/core/mappers/auth/registration.mapper';
import { Login } from '@js-camp/core/models/auth/login';
import { UserSecret } from '@js-camp/core/models/auth/user-secret';

import { catchHttpErrorResponse } from '../rxjs/catch-http-error-response';
import { ApiUrlsConfig } from './api-urls.config';
import { UserSecretService } from './user-secret.service';

/** Auth service. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {

	/** User is auth. */
	public readonly isAuth$: Observable<boolean>;

	private readonly isAuthUpdated$ = new Subject<boolean>();

	private readonly http = inject(HttpClient);

	private readonly apiUrlsConfig = inject(ApiUrlsConfig);

	private readonly userSecretService = inject(UserSecretService);

	public constructor() {
		this.isAuth$ = concat(
			this.userSecretService.getTokens().pipe(
				first(),
				map(tokens => tokens !== null),
			),
			this.isAuthUpdated$,
		).pipe(distinctUntilChanged());
	}

	/**
	 * Handle login.
	 * @param credentials Login credentials.
	 */
	public login(credentials: Login): Observable<void> {
		const url = this.apiUrlsConfig.auth.login;
		return this.http
			.post<UserSecretDto>(url, LoginMapper.toDto(credentials))
			.pipe(
				map(tokens => UserSecretMapper.fromDto(tokens)),
				switchMap(tokens => this.userSecretService.saveToken(tokens).pipe(
					tap(() => this.isAuthUpdated$.next(true)),
				)),
				catchHttpErrorResponse(LoginMapper.validateErrorFromDto),
			);
	}

	/**
	 * Handle register.
	 * @param credentials Register credentials.
	 */
	public register(credentials: Registration): Observable<void> {
		const url = this.apiUrlsConfig.auth.register;
		return this.http
			.post<UserSecretDto>(url, RegistrationMapper.toDto(credentials))
			.pipe(
				map(tokens => UserSecretMapper.fromDto(tokens)),
				switchMap(tokens => this.userSecretService.saveToken(tokens).pipe(
					tap(() => this.isAuthUpdated$.next(true)),
				)),
				catchHttpErrorResponse(RegistrationMapper.validateErrorFromDto),
			);
	}

	/** Handle logout. */
	public logout(): Observable<void> {
		return this.userSecretService.destroyToken().pipe(
			tap(() => this.isAuthUpdated$.next(false)),
		);
	}

	/**
	 * Refresh user's secret.
	 * @param secret Secret data.
	 */
	public refreshSecret(
		secret: UserSecret,
	): Observable<void> {
		return this.http.post<UserSecretDto>(
			this.apiUrlsConfig.auth.refreshSecret,
			UserSecretMapper.toDto(secret),
		)
			.pipe(
				map(secretDto => UserSecretMapper.fromDto(secretDto)),
				switchMap(updatedSecret => this.userSecretService.saveToken(updatedSecret)),
				catchError((error: unknown) => merge(
					this.logout(),
					throwError(() => error),
				)),
			);
	}
}
