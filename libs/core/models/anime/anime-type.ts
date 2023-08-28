import { enumToArray } from '../../utils/enum-to-array';

/** Anime type. */
export enum AnimeType {
	TV = 'TV',
	OVA = 'OVA',
	Movie = 'Movie',
	Special = 'Special',
	ONA = 'ONA',
	Music = 'Music',
	Unknown = 'Unknown',
}

/** Anime Type. */
export namespace AnimeType {
	const TO_READABLE_TYPE: Record<AnimeType, string> = {
		[AnimeType.TV]: 'TV',
		[AnimeType.OVA]: 'OVA',
		[AnimeType.Movie]: 'Movie',
		[AnimeType.Special]: 'Special',
		[AnimeType.ONA]: 'ONA',
		[AnimeType.Music]: 'Music',
		[AnimeType.Unknown]: 'Unknown',
	};

	/** Converts enum anime type to array. */
	export function toArray(): readonly AnimeType[] {
		return enumToArray(AnimeType);
	}

	/**
	 * Makes anime type readable.
	 * @param value Anime type.
	 */
	export function toReadable(value: AnimeType): string {
		return TO_READABLE_TYPE[value];
	}
}
