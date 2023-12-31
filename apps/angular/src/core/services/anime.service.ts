import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpStatusCode } from 'axios';

import { Anime } from '@js-camp/core/models/anime/anime';
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
import { AnimeFormData } from '@js-camp/core/models/anime/anime-form-data';
import { AnimeFormDataMapper } from '@js-camp/core/mappers/anime/anime-form-data.mapper';

import { ApiUrlsConfig } from './api-urls.config';
import { S3Service } from './s3-bucket.service';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {

	private readonly http = inject(HttpClient);

	private readonly apiUrlsConfig = inject(ApiUrlsConfig);

	private readonly s3Service = inject(S3Service);

	private readonly router = inject(Router);

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
			.pipe(
				map(detailsDto => AnimeDetailsMapper.fromDto(detailsDto)),
				catchError((error: unknown) => {
					if (error instanceof HttpErrorResponse && error.status === HttpStatusCode.NotFound) {
						this.router.navigate(['']);
					}
					return throwError(() => error);
				}),
			);
	}

	/**
	 * Edit anime.
	 * @param id Anime ID.
	 * @param anime Anime.
	 */
	public editAnime(id: Anime['id'], anime: AnimeFormData): Observable<AnimeDetails> {
		const url = this.apiUrlsConfig.anime.edit(id);

		return this.http.put<AnimeDetailsDto>(url, AnimeFormDataMapper.toDto(anime))
			.pipe(map(animeDto => AnimeDetailsMapper.fromDto(animeDto)));
	}

	/**
	 * Create anime.
	 * @param anime Anime.
	 */
	public createAnime(anime: AnimeFormData): Observable<AnimeDetails> {
		const url = this.apiUrlsConfig.anime.create;

		return this.http.post<AnimeDetailsDto>(url, AnimeFormDataMapper.toDto(anime))
			.pipe(map(animeDto => AnimeDetailsMapper.fromDto(animeDto)));
	}

	/**
	 * Delete anime.
	 * @param id Anime ID.
	 */
	public deleteAnime(id: Anime['id']): Observable<void> {
		const url = this.apiUrlsConfig.anime.delete(id);

		return this.http.delete(url).pipe(map(() => undefined));
	}

	/**
	 * Save anime image to s3 bucket.
	 * @param imageFile Anime cover file.
	 */
	public saveAnimeImage(imageFile: File | null): Observable<string | null> {
		if (imageFile instanceof File) {
			return this.s3Service.saveImage(imageFile, imageFile.name, 'anime_images');
		}
		return of(imageFile);
	}
}
