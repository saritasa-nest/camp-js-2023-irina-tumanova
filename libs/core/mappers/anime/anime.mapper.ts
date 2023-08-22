import { AnimeType } from '../../models/anime/anime-type';
import { AnimeDto, AnimeStatusDto, AnimeTypeDto } from '../../dtos/anime/anime.dto';
import { Anime } from '../../models/anime/anime';
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

	/** Anime status transformation object in DTO. */
	const ANIME_STATUS_FROM_DTO = {
		[AnimeStatusDto.Airing]: AnimeStatus.Airing,
		[AnimeStatusDto.Finished]: AnimeStatus.Finished,
		[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
		[AnimeStatusDto.Unknown]: AnimeStatus.Unknown,
	};
}
