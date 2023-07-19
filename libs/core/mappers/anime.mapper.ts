import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { DateRangeMapper } from './date-range.mapper';

export namespace AnimeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return {
			id: dto.id,
			created: new Date(dto.created),
			modified: new Date(dto.modified),
			titleEnglish: dto.title_eng,
			titleJapanese: dto.title_jpn,
			image: dto.image,
			aired: DateRangeMapper.fromDto(dto.aired),
			type: dto.type,
			status: dto.status,
			score: dto.score,
			userScore: dto.user_score,
		};
	}
}
