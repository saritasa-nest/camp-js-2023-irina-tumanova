import { Anime } from '@js-camp/core/models/anime/anime';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';
import { AnimeParams } from '@js-camp/core/models/anime/anime-params';
import { ListParamsMapper } from '@js-camp/core/mappers/list-params.mapper';
import { AnimeFilterParamsMapper } from '@js-camp/core/mappers/anime/anime-filter-params.mapper';

import { http } from '..';

const url = 'anime/anime/';

export namespace AnimeService {

	/**
	 * Get anime list.
	 * @param animeParams Params from anime table.
	 */
	export async function fetchAnime(animeParams: AnimeParams): Promise<Anime[]> {
		const params = {
			fromObject: ListParamsMapper.toDto(
				animeParams,
				AnimeFilterParamsMapper.toDto,
				field => AnimeFilterParamsMapper.ANIME_SORT_FIELD_TO_DTO[field],
			),
		};

		const { data } = await http.get<PaginationDto<AnimeDto>>(url, { params });

		return data.results.map(animeDto => AnimeMapper.fromDto(animeDto));
	}
}
