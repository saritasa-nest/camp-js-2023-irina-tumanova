import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime/anime';
import { Observable, map } from 'rxjs';
import { AnimeDto } from '@js-camp/core/dtos/anime/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';
import { AnimeParams } from '@js-camp/core/models/anime/anime-params';
import { ListParamsMapper } from '@js-camp/core/mappers/list-params.mapper';
import { AnimeFilterParamsMapper } from '@js-camp/core/mappers/anime/anime-filter-params.mapper';
import { AnimeDetails } from '@js-camp/core/models/anime/anime-details';
import { AnimeDetailsDto } from '@js-camp/core/dtos/anime/anime-details.dto';
import { AnimeDetailsMapper } from '@js-camp/core/mappers/anime/anime-details.mapper';

import { ApiUrlsConfig } from './api-urls.config';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {

	private readonly http = inject(HttpClient);

	private readonly apiUrlsConfig = inject(ApiUrlsConfig);

	/**
	 * Get anime list.
	 * @param animeParams Params from anime table.
	 */
	public getAnime(animeParams: AnimeParams): Observable<Pagination<Anime>> {
		const url = this.apiUrlsConfig.anime.getList;
		const params = new HttpParams({
			fromObject: ListParamsMapper.toDto(
				animeParams,
				AnimeFilterParamsMapper.toDto,
				field => AnimeFilterParamsMapper.ANIME_SORT_FIELD_TO_DTO[field],
			),
		});

		return this.http
			.get<PaginationDto<AnimeDto>>(url, { params })
			.pipe(
				map(paginationDto =>
					PaginationMapper.fromDto(paginationDto, animeDto =>
						AnimeMapper.fromDto(animeDto))),
			);
	}

	/**
	 * Get anime details.
	 * @param id Anime ID.
	 */
	public getAnimeDetails(id: Anime['id']): Observable<AnimeDetails> {
		const url = this.apiUrlsConfig.anime.getDetail(id);

		return this.http
			.get<AnimeDetailsDto>(url)
			.pipe(map(detailsDto => AnimeDetailsMapper.fromDto(detailsDto)));
	}
}
