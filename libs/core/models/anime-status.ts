/** Anime status. */
export enum AnimeStatus {
	Airing = 'Airing',
	Finished = 'Finished',
	NotYetAired = 'NotYetAired',
	Unknown = 'Unknown',
}

export namespace AnimeStatus {

	const TO_READABLE_MAP: Readonly<Record<AnimeStatus, string>> = {
		[AnimeStatus.Airing]: 'Airing',
		[AnimeStatus.Finished]: 'Finished',
		[AnimeStatus.NotYetAired]: 'Not yet aired',
		[AnimeStatus.Unknown]: 'Unknown',
	};

	/**
	 * Converts a certain anime status into readable equivalent.
	 * @param value AnimeListItem type.
	 */
	export function toReadable(value: AnimeStatus): string {
		return TO_READABLE_MAP[value];
	}

	/**
	 * Converts string into anime status.
	 * @param value Value.
	 */
	export function toAnimeStatus(value: string): AnimeStatus {
		const type = value as AnimeStatus;
		return TO_READABLE_MAP[type] ? type : AnimeStatus.Unknown;
	}
}
