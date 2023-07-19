import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeParams } from '@js-camp/core/models/anime-params';
import { ListParamsMapper } from '@js-camp/core/mappers/list-params.mapper';
import { AnimeFilterParamsMapper } from '@js-camp/core/mappers/anime-filter-params.mapper';

import { AppUrlsConfig } from './app-urls.config';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {

	private readonly http = inject(HttpClient);

	private readonly appUrlsConfig = inject(AppUrlsConfig);

	/**
	 * Get anime list.
	 * @param animeParams Params from anime table.
	 */
	public getAnime(animeParams: AnimeParams): Observable<Pagination<Anime>> {
		const url = this.appUrlsConfig.anime.getAnime;
		const params = new HttpParams({
			fromObject: { ...ListParamsMapper.toDto(animeParams, AnimeFilterParamsMapper.toDto) },
		});

		return this.http
			.get<PaginationDto<AnimeDto>>(url, { params })
			.pipe(
				map(paginationDto =>
					PaginationMapper.fromDto(paginationDto, animeDto =>
						AnimeMapper.fromDto(animeDto))),
				catchError((error: unknown) => this.handleError(error as HttpErrorResponse)),
			);
	}

	/**
	 * Handle error.
	 * @param error Error.
	 */
	private handleError(error: HttpErrorResponse): Observable<never> {
		if (error.status === 0) {
			console.error('An error occurred:', error.error);
		} else {
			console.error(`Backend returned code ${error.status}, body was: `, error.error);
		}

		return throwError(() => new Error('Something bad happened; please try again later.'));
	}
}
