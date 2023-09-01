import { Anime } from '@js-camp/core/models/anime/anime';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';
import { AnimeParams } from '@js-camp/core/models/anime/anime-params';
import { ListParamsMapper } from '@js-camp/core/mappers/list-params.mapper';
import { AnimeFilterParamsMapper } from '@js-camp/core/mappers/anime/anime-filter-params.mapper';
import { AnimeDetailsDto } from '@js-camp/core/dtos/anime/anime-details.dto';
import { AnimeDetailsMapper } from '@js-camp/core/mappers/anime/anime-details.mapper';
import { AnimeDetails } from '@js-camp/core/models/anime/anime-details';

import { http } from '..';
import { ApiUrlsConfig } from '../apiUrlsConfig';

export namespace AnimeService {

	/**
	 * Get anime list.
	 * @param params Params from anime table.
	 */
	export async function fetchAnime(params: AnimeParams): Promise<Anime[]> {
		const { data } = await http.get<PaginationDto<AnimeDto>>(ApiUrlsConfig.anime.getList, {
			params: ListParamsMapper.toDto(
				params,
				AnimeFilterParamsMapper.toDto,
				field => AnimeFilterParamsMapper.ANIME_SORT_FIELD_TO_DTO[field],
			),
		});
		return data.results.map(dto => AnimeMapper.fromDto(dto));
	}

	/**
	 * Fetches anime details.
	 * @param id Anime id.
	 */
	export async function fetchAnimeDetails(id: Anime['id']): Promise<AnimeDetails> {
		const { data } = await http.get<AnimeDetailsDto>(ApiUrlsConfig.anime.getDetail(id));
		return AnimeDetailsMapper.fromDto(data);
	}
}
