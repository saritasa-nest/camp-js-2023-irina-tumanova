import { Anime } from '@js-camp/core/models/anime/anime';
import { Studio } from '@js-camp/core/models/studio/studio';
import { Genre } from '@js-camp/core/models/genre/genre';

const AUTH_URL_PATH = 'auth';

/** Urls used within the application. */
export namespace ApiUrlsConfig {
	const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

	/** Anime routes. */
	export const anime = {
		getList: toApi('anime/anime/'),
		getDetail: (id: Anime['id']) => toApi(`anime/anime/${id}/`),
		delete: (id: Anime['id']) => toApi(`anime/anime/${id}/`),
		edit: (id: Anime['id']) => toApi(`anime/anime/${id}/`),
		create: toApi('anime/anime/'),
	};

	/** Genre routes. */
	export const genre = {
		getList: toApi('anime/genres/'),
		getDetail: (id: Genre['id']) => toApi(`anime/genres/${id}/`),
		create: toApi('anime/genres/'),
	};

	/** Studio routes. */
	export const studio = {
		getList: toApi('anime/studios/'),
		getDetail: (id: Studio['id']) => toApi(`anime/studios/${id}/`),
		create: toApi('anime/studios/'),
	};

	/** S3 routes. */
	export const s3 = {
		getParams: toApi('s3direct/get_params/'),
	};

	/** Auth routes. */
	export const auth = {
		login: toApi(`${AUTH_URL_PATH}/login/`),
		register: toApi(`${AUTH_URL_PATH}/register/`),
		refreshSecret: toApi(`${AUTH_URL_PATH}/token/refresh/`),
		verifySecret: toApi(`${AUTH_URL_PATH}/token/verify/`),
	};

	/** User routes. */
	export const user = {
		getCurrent: toApi('users/profile/'),
		updateCurrent: toApi('users/update-profile/'),
	};

	/**
	 * Args to apy url.
	 * @param args Args.
	 */
	function toApi(...args: readonly string[]): string {
		const path = args.join('/');
		return new URL(path, apiUrl).toString();
	}

	/**
	 * Check if the link belongs to the application.
	 * @param url Request url.
	 */
	export function isAppUrl(url: string): boolean {
		return url.startsWith(apiUrl);
	}

	/**
	 * Check if the link belongs to the auth.
	 * @param url Request url.
	 */
	export function isAuthUrl(url: string): boolean {
		return url.includes(AUTH_URL_PATH);
	}
}
