import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime';
import { Observable, map } from 'rxjs';
import { environment } from '@js-camp/angular/environments/environment';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper.';
import { AnimeQueryParams } from '@js-camp/core/models/anime-query-params';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/anime-query-params.mapper';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	public constructor(private readonly http: HttpClient) { }

	/**
	 * Get anime list.
	 * @param animeParams Params from anime table.
	 */
	public getAllAnime(animeParams: AnimeQueryParams): Observable<Pagination<Anime>> {
		const url = `${environment.apiUrl}/anime/anime/`;
		const params = new HttpParams({
			fromObject: { ...AnimeQueryParamsMapper.toDto(animeParams) },
		});

		return this.http
			.get<PaginationDto<AnimeDto>>(url, { params })
			.pipe(
				map(paginationDto =>
					PaginationMapper.fromDto(paginationDto, animeDto =>
						AnimeMapper.fromDto(animeDto))),
			);
	}
}
