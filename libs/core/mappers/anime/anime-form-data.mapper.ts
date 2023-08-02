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
			image: model.imageUrl,
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
		};
	}
}
