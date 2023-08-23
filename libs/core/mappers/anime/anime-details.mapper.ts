import { AnimeSource } from '../../models/anime/anime-source';
import { AnimeSeason } from '../../models/anime/anime-season';
import { AnimeDetailsDto, AnimeRatingDto, AnimeSeasonDto, AnimeSourceDto } from '../../dtos/anime/anime-details.dto';
import { AnimeDetails, AnimeRating } from '../../models/anime/anime-details';
import { AnimeMapper } from './anime.mapper';
import { GenreMapper } from '../genre/genre.mapper';
import { StudioMapper } from '../studio/studio.mapper';

export namespace AnimeDetailsMapper {

	/**
	 * Maps DTO to model.
	 * @param dto Studio DTO.
	 */
	export function fromDto(dto: AnimeDetailsDto): AnimeDetails {
		return new AnimeDetails({
			...AnimeMapper.fromDto(dto),
			description: dto.synopsis,
			airing: dto.airing,
			studios: dto.studios_data.map(StudioMapper.fromDto),
			genres: dto.genres_data.map(GenreMapper.fromDto),
			trailerYoutubeId: dto.trailer_youtube_id,
			source: ANIME_SOURCE_FROM_DTO[dto.source],
			rating: ANIME_RATING_FROM_FTO[dto.rating],
			season: ANIME_SEASON_FROM_DTO[dto.season],
		});
	}

	const ANIME_SOURCE_FROM_DTO = {
		[AnimeSourceDto.Book]: AnimeSource.Book,
		[AnimeSourceDto.CardGame]: AnimeSource.CardGame,
		[AnimeSourceDto.FourKomaMang]: AnimeSource.FourKomaMang,
		[AnimeSourceDto.LightNovel]: AnimeSource.LightNovel,
		[AnimeSourceDto.Manga]: AnimeSource.Manga,
		[AnimeSourceDto.MixedMedia]: AnimeSource.MixedMedia,
		[AnimeSourceDto.Music]: AnimeSource.Music,
		[AnimeSourceDto.Novel]: AnimeSource.Novel,
		[AnimeSourceDto.Original]: AnimeSource.Original,
		[AnimeSourceDto.Other]: AnimeSource.Other,
		[AnimeSourceDto.PictureBook]: AnimeSource.PictureBook,
		[AnimeSourceDto.Radio]: AnimeSource.Radio,
		[AnimeSourceDto.Unknown]: AnimeSource.Unknown,
		[AnimeSourceDto.VisualNovel]: AnimeSource.VisualNovel,
		[AnimeSourceDto.WebManga]: AnimeSource.WebManga,
		[AnimeSourceDto.WebNovel]: AnimeSource.WebNovel,
		[AnimeSourceDto.Game]: AnimeSource.Game,
	};

	const ANIME_RATING_FROM_FTO = {
		[AnimeRatingDto.G]: AnimeRating.G,
		[AnimeRatingDto.PG]: AnimeRating.PG,
		[AnimeRatingDto.PG13]: AnimeRating.PG13,
		[AnimeRatingDto.PX]: AnimeRating.PX,
		[AnimeRatingDto.R17]: AnimeRating.R17,
		[AnimeRatingDto.RPlus]: AnimeRating.RPlus,
		[AnimeRatingDto.Unknown]: AnimeRating.Unknown,
	};

	const ANIME_SEASON_FROM_DTO = {
		[AnimeSeasonDto.Summer]: AnimeSeason.Summer,
		[AnimeSeasonDto.Fall]: AnimeSeason.Fall,
		[AnimeSeasonDto.NonSeasonal]: AnimeSeason.NonSeasonal,
		[AnimeSeasonDto.Spring]: AnimeSeason.Spring,
		[AnimeSeasonDto.Winter]: AnimeSeason.Winter,
	};
}
