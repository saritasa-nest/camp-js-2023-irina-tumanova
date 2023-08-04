import { AnimeRatingDto, AnimeSeasonDto, AnimeSourceDto } from '../../dtos/anime/anime-details.dto';
import { AnimeSource } from '../../models/anime/anime-source';
import { AnimeRating } from '../../models/anime/anime-details';
import { AnimeSeason } from '../../models/anime/anime-season';
import { AnimeFormDataDto } from '../../dtos/anime/anime-form-data.dto';
import { AnimeFormData } from '../../models/anime/anime-form-data';
import { DateRangeMapper } from '../date-range.mapper';

import { AnimeMapper } from './anime.mapper';

export namespace AnimeFormDataMapper {

	/**
	 * Maps model to DTO.
	 * @param model Studio.
	 */
	export function toDto(model: AnimeFormData): AnimeFormDataDto {

		return {
			image: model.image as string,
			trailer_youtube_id: model.trailerYoutubeId.length > 0 ? model.trailerYoutubeId : null,
			title_eng: model.titleEnglish,
			title_jpn: model.titleJapanese,
			type: model.type !== null ? AnimeMapper.ANIME_TYPE_TO_DTO[model.type] : null,
			status: model.status !== null ? AnimeMapper.ANIME_STATUS_TO_DTO[model.status] : null,
			airing: model.airing,
			aired: DateRangeMapper.toDto(model.aired),
			synopsis: model.description,
			studios: model.studios,
			genres: model.genres,
			rating: model.rating !== null ? ANIME_RATING_TO_FTO[model.rating] : null,
			season: model.season !== null ? ANIME_SEASON_TO_DTO[model.season] : null,
			source: model.source !== null ? ANIME_SOURCE_TO_DTO[model.source] : null,
		};
	}

	const ANIME_SOURCE_TO_DTO = {
		[AnimeSource.Book]: AnimeSourceDto.Book,
		[AnimeSource.CardGame]: AnimeSourceDto.CardGame,
		[AnimeSource.FourKomaMang]: AnimeSourceDto.FourKomaMang,
		[AnimeSource.LightNovel]: AnimeSourceDto.LightNovel,
		[AnimeSource.Manga]: AnimeSourceDto.Manga,
		[AnimeSource.MixedMedia]: AnimeSourceDto.MixedMedia,
		[AnimeSource.Music]: AnimeSourceDto.Music,
		[AnimeSource.Novel]: AnimeSourceDto.Novel,
		[AnimeSource.Original]: AnimeSourceDto.Original,
		[AnimeSource.Other]: AnimeSourceDto.Other,
		[AnimeSource.PictureBook]: AnimeSourceDto.PictureBook,
		[AnimeSource.Radio]: AnimeSourceDto.Radio,
		[AnimeSource.Unknown]: AnimeSourceDto.Unknown,
		[AnimeSource.VisualNovel]: AnimeSourceDto.VisualNovel,
		[AnimeSource.WebManga]: AnimeSourceDto.WebManga,
		[AnimeSource.WebNovel]: AnimeSourceDto.WebNovel,
	};

	const ANIME_RATING_TO_FTO = {
		[AnimeRating.G]: AnimeRatingDto.G,
		[AnimeRating.PG]: AnimeRatingDto.PG,
		[AnimeRating.PG13]: AnimeRatingDto.PG13,
		[AnimeRating.PX]: AnimeRatingDto.PX,
		[AnimeRating.R17]: AnimeRatingDto.R17,
		[AnimeRating.RPlus]: AnimeRatingDto.RPlus,
		[AnimeRating.Unknown]: AnimeRatingDto.Unknown,
	};

	const ANIME_SEASON_TO_DTO = {
		[AnimeSeason.Summer]: AnimeSeasonDto.Summer,
		[AnimeSeason.Fall]: AnimeSeasonDto.Fall,
		[AnimeSeason.NonSeasonal]: AnimeSeasonDto.NonSeasonal,
		[AnimeSeason.Spring]: AnimeSeasonDto.Spring,
		[AnimeSeason.Winter]: AnimeSeasonDto.Winter,
	};
}
