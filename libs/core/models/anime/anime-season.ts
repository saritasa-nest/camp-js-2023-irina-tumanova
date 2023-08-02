/** Anime season. */
export enum AnimeSeason {
	Summer = 'Summer',
	Winter = 'Winter',
	Spring = 'Spring',
	Fall = 'Fall',
	NonSeasonal = 'NonSeasonal',
}

export namespace AnimeSeason {

	const TO_READABLE_MAP: Readonly<Record<AnimeSeason, string>> = {
		[AnimeSeason.Summer]: 'Summer',
		[AnimeSeason.Winter]: 'Winter',
		[AnimeSeason.Spring]: 'Spring',
		[AnimeSeason.Fall]: 'Fall',
		[AnimeSeason.NonSeasonal]: 'Non-Seasonal',
	};

	/**
	 * Converts a certain anime season into readable equivalent.
	 * @param season Anime season.
	 */
	export function toReadable(season: AnimeSeason): string {
		return TO_READABLE_MAP[season];
	}
}
