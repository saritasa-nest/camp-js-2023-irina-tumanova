import { DateRange } from '../date-range';
import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';

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
	public readonly imageUrl: string;

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

	public constructor(data: InitAnimeParams) {
		this.id = data.id;
		this.created = data.created;
		this.modified = data.modified;
		this.titleEnglish = data.titleEnglish;
		this.titleJapanese = data.titleJapanese;
		this.imageUrl = data.imageUrl;
		this.aired = data.aired;
		this.type = data.type;
		this.status = data.status;
		this.score = data.score;
		this.userScore = data.userScore;
	}
}

type InitAnimeParams = Anime;
