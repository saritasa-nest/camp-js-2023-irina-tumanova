import { UserSecretDto } from '@js-camp/core/dtos/auth/user-secret.dto';
import { UserSecretMapper } from '@js-camp/core/mappers/auth/user-secret.mapper';
import { Registration } from '@js-camp/core/models/auth/registration';
import { LoginMapper } from '@js-camp/core/mappers/auth/login.mapper';
import { RegistrationMapper } from '@js-camp/core/mappers/auth/registration.mapper';
import { Login } from '@js-camp/core/models/auth/login';
import { UserSecret } from '@js-camp/core/models/auth/user-secret';
import { AppValidationError } from '@js-camp/core/models/app-error';
import { AxiosError } from 'axios';
import { HttpErrorItemDto } from '@js-camp/core/dtos/http-error.dto';
import { AppErrorDictionaryMapper } from '@js-camp/core/mappers/app-error.mapper';

import { ApiUrlsConfig } from '../apiUrlsConfig';
import { http } from '..';

import { UserSecretService } from './userSecretService';

/** Auth service. */
export namespace AuthService {

	/**
	 * Handle login.
	 * @param credentials Login credentials.
	 */
	export async function login(credentials: Login): Promise<void> {
		const { data: userSecretDto } = await http.post<UserSecretDto>(
			ApiUrlsConfig.auth.login,
			LoginMapper.toDto(credentials),
		);
		const userSecret = UserSecretMapper.fromDto(userSecretDto);
		return UserSecretService.saveToken(userSecret);
	}

	/**
	 * Handle register.
	 * @param credentials Register credentials.
	 */
	export async function register(credentials: Registration): Promise<void> {
		const { data: userSecretDto } = await http.post<UserSecretDto>(
			ApiUrlsConfig.auth.register,
			RegistrationMapper.toDto(credentials),
		);
		const userSecret = UserSecretMapper.fromDto(userSecretDto);
		return UserSecretService.saveToken(userSecret);
	}

	/** Handle logout. */
	export function logout(): Promise<void> {
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
			if (data.errors instanceof Array) {
				return AppErrorDictionaryMapper.fromDto(data.errors, mapValidationError);
			}
		}
		return new Error('Unknown error');
	}
}
