/** Anime type dto. */
export enum AnimeType {
	TV = 'TV',
	OVA = 'OVA',
	Movie = 'Movie',
	Special = 'Special',
	ONA = 'ONA',
	Music = 'Music',
	Unknown = 'Unknown',
}

/** Genre Type. */
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

	/**
	 * Makes genre type readable.
	 * @param value Genre type.
	 */
	export function toReadable(value: AnimeType): string {
		return TO_READABLE_TYPE[value];
	}
}
