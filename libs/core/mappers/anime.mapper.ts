import { AnimeDto, AnimeStatusDto, AnimeTypeDto } from '../dtos/anime.dto';
import { Anime, AnimeType } from '../models/anime';
import { AnimeStatus } from '../models/anime-status';

import { DateRangeMapper } from './date-range.mapper';

export namespace AnimeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime DTO.
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
			type: ANIME_TYPE_FROM_DTO[dto.type],
			status: ANIME_STATUS_FROM_DTO[dto.status],
			score: dto.score,
			userScore: dto.user_score,
		};
	}

	/** Anime type transformation object in DTO. */
	const ANIME_TYPE_FROM_DTO = {
		[AnimeTypeDto.TV]: AnimeType.TV,
		[AnimeTypeDto.OVA]: AnimeType.OVA,
		[AnimeTypeDto.Movie]: AnimeType.Movie,
		[AnimeTypeDto.Special]: AnimeType.Special,
		[AnimeTypeDto.ONA]: AnimeType.ONA,
		[AnimeTypeDto.Music]: AnimeType.Music,
		[AnimeTypeDto.Unknown]: AnimeType.Unknown,
	};

	/** Anime type transformation object in DTO. */
	const ANIME_STATUS_FROM_DTO = {
		[AnimeStatusDto.Airing]: AnimeStatus.Airing,
		[AnimeStatusDto.Finished]: AnimeStatus.Finished,
		[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
		[AnimeStatusDto.Unknown]: AnimeStatus.Unknown,
	};
}
