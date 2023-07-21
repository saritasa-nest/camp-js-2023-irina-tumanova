import { AnimeStatus } from './anime-status';

import { DateRange } from './date-range';

/** Anime. */
export class Anime {

	/** ID. */
	public readonly id: number;

	/** Creation date. */
	public readonly created: Date;

	/** Modification date. */
	public readonly modified: Date;

	/** English title. */
	public readonly titleEnglish: string;

	/** Japanese title. */
	public readonly titleJapanese: string;

	/** Image. */
	public readonly image: string;

	/** Release period. */
	public readonly aired: DateRange;

	/** Type. */
	public readonly type: AnimeType;

	/** Status. */
	public readonly status: AnimeStatus;

	/** Score. */
	public readonly score: number | null;

	/** User score. */
	public readonly userScore: number | null;

	public constructor(
		{ id, created, modified, titleEnglish, titleJapanese, image, aired, type, score, status, userScore }: InitAnimeParams,
	) {
		this.id = id;
		this.created = created;
		this.modified = modified;
		this.titleEnglish = titleEnglish;
		this.titleJapanese = titleJapanese;
		this.image = image;
		this.aired = aired;
		this.type = type;
		this.status = status;
		this.score = score;
		this.userScore = userScore;
	}
}

type InitAnimeParams = Anime;

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
