import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Genre } from '@js-camp/core/models/anime/genre';
import { GenreDto, GenreTypeDto } from '@js-camp/core/dtos/anime/genre.dto';
import { GenreMapper } from '@js-camp/core/mappers/anime/genre.mapper';
import { DefaultListParams } from '@js-camp/core/models/list-params';
import { ListParamsMapper } from '@js-camp/core/mappers/list-params.mapper';

import { ApiUrlsConfig } from './api-urls.config';

/** Genre service. */
@Injectable({
	providedIn: 'root',
})
export class GenreService {

	private readonly http = inject(HttpClient);

	private readonly apiUrlsConfig = inject(ApiUrlsConfig);

	/**
	 * Get genres.
	 * @param genreParams Params from genres.
	 */
	public getGenres(genreParams: DefaultListParams<undefined>): Observable<Pagination<Genre>> {
		const url = this.apiUrlsConfig.genre.getList;
		const params = new HttpParams({
			fromObject: ListParamsMapper.toDto(
				genreParams,
				filters => filters,
				() => undefined,
			),
		});

		return this.http
			.get<PaginationDto<GenreDto>>(url, { params })
			.pipe(map(pagination => PaginationMapper.fromDto(pagination, GenreMapper.fromDto)));
	}

	/**
	 * Create genre.
	 * @param genreName Genre's name.
	 */
	public createGenre(genreName: string): Observable<Genre> {
		const url = this.apiUrlsConfig.genre.create;

		return this.http
			.post<GenreDto>(url, { name: genreName, type: GenreTypeDto.Genres })
			.pipe(map(genreDto => GenreMapper.fromDto(genreDto)));
	}
}
