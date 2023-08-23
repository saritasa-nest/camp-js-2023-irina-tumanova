import { AxiosError } from 'axios';

import { UserSecretDto } from '@js-camp/core/dtos/auth/user-secret.dto';
import { UserSecretMapper } from '@js-camp/core/mappers/auth/user-secret.mapper';
import { Registration } from '@js-camp/core/models/auth/registration';
import { LoginMapper } from '@js-camp/core/mappers/auth/login.mapper';
import { RegistrationMapper } from '@js-camp/core/mappers/auth/registration.mapper';
import { Login } from '@js-camp/core/models/auth/login';
import { UserSecret } from '@js-camp/core/models/auth/user-secret';
import { AppValidationError } from '@js-camp/core/models/app-error';
import { HttpErrorItemDto } from '@js-camp/core/dtos/http-error.dto';
import { AppErrorDictionaryMapper } from '@js-camp/core/mappers/app-error.mapper';

import { ApiUrlsConfig } from '../apiUrlsConfig';
import { http } from '..';
import { UserSecretService } from './userSecret';

/** Auth service. */
export namespace AuthService {

	/**
	 * Handle login.
	 * @param credentials Login credentials.
	 */
	export async function login(credentials: Login): Promise<void> {
		try {
			const { data: userSecretDto } = await http.post<UserSecretDto>(
				ApiUrlsConfig.auth.login,
				LoginMapper.toDto(credentials),
			);
			const userSecret = UserSecretMapper.fromDto(userSecretDto);
			return UserSecretService.saveToken(userSecret);
		} catch (error: unknown) {
			return Promise.reject(AuthService.mapError(error, LoginMapper.validateErrorFromDto));
		}
	}

	/**
	 * Handle register.
	 * @param credentials Register credentials.
	 */
	export async function register(credentials: Registration): Promise<void> {
		try {
			const { data: userSecretDto } = await http.post<UserSecretDto>(
				ApiUrlsConfig.auth.register,
				RegistrationMapper.toDto(credentials),
			);
			const userSecret = UserSecretMapper.fromDto(userSecretDto);
			return UserSecretService.saveToken(userSecret);
		} catch (error: unknown) {
			return Promise.reject(AuthService.mapError(error, RegistrationMapper.validateErrorFromDto));
		}
	}

	/** Handle logout. */
	export function logout(): void {
		return UserSecretService.destroyToken();
	}

	/**
	 * Refresh user's secret.
	 * @param secret Secret data.
	 */
	export async function refreshSecret(secret: UserSecret): Promise<UserSecret> {
		const { data: userSecterDto } = await http.post<UserSecretDto>(
			ApiUrlsConfig.auth.refreshSecret,
			UserSecretMapper.toDto(secret),
		);

		const userSecret = UserSecretMapper.fromDto(userSecterDto);
		UserSecretService.saveToken(userSecret);
		return userSecret;
	}

	/**
	 * Map error.
	 * @param error Request error.
	 * @param mapValidationError Map validation error.
	 */
	export function mapError<TValidationErrors extends object>(
		error: unknown,
		mapValidationError: (errors: readonly HttpErrorItemDto[]) => TValidationErrors,
	): AppValidationError<TValidationErrors> | Error | null {
		if (error instanceof AxiosError && error.response !== undefined) {
			const { data } = error.response;
			if (Array.isArray(data.errors)) {
				return AppErrorDictionaryMapper.fromDto(data.errors, mapValidationError);
			}
		}
		return new Error('Unknown error');
	}
}
