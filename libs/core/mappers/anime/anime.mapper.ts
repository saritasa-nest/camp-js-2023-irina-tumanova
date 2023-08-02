import { AnimeDto, AnimeStatusDto, AnimeTypeDto } from '../../dtos/anime/anime.dto';
import { Anime, AnimeType } from '../../models/anime/anime';
import { AnimeStatus } from '../../models/anime/anime-status';

import { DateRangeMapper } from '../date-range.mapper';

export namespace AnimeMapper {

	/**
	 * Maps DTO to model.
	 * @param dto Anime DTO.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			created: new Date(dto.created),
			modified: new Date(dto.modified),
			titleEnglish: dto.title_eng,
			titleJapanese: dto.title_jpn,
			imageUrl: dto.image,
			aired: DateRangeMapper.fromDto(dto.aired),
			type: ANIME_TYPE_FROM_DTO[dto.type],
			status: ANIME_STATUS_FROM_DTO[dto.status],
			score: dto.score,
			userScore: dto.user_score,
		});
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

	/** Anime type transformation object in DTO. */
	export const ANIME_TYPE_TO_DTO = {
		[AnimeType.TV]: AnimeTypeDto.TV,
		[AnimeType.OVA]: AnimeTypeDto.OVA,
		[AnimeType.Movie]: AnimeTypeDto.Movie,
		[AnimeType.Special]: AnimeTypeDto.Special,
		[AnimeType.ONA]: AnimeTypeDto.ONA,
		[AnimeType.Music]: AnimeTypeDto.Music,
		[AnimeType.Unknown]: AnimeTypeDto.Unknown,
	};

	/** Anime type transformation object in DTO. */
	export const ANIME_STATUS_TO_DTO = {
		[AnimeStatus.Airing]: AnimeStatusDto.Airing,
		[AnimeStatus.Finished]: AnimeStatusDto.Finished,
		[AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
		[AnimeStatus.Unknown]: AnimeStatusDto.Unknown,
	};
}
