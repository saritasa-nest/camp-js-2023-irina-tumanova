import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime';
import { Observable, delay, map } from 'rxjs';
import { environment } from '@js-camp/angular/environments/environment';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper.';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	public constructor(private http: HttpClient) { }

	/** Get anime list. */
	public getAllAnime(): Observable<Pagination<Anime>> {
		const url = `${environment.apiUrl}/anime/anime/`;
		const params = new HttpParams({
			fromObject: { limit: 100, offset: 0 },
		});

		return this.http
			.get<PaginationDto<AnimeDto>>(url, { params })
			.pipe(
				delay(500),
				map(paginationDto =>
					PaginationMapper.fromDto(paginationDto, animeDto =>
						AnimeMapper.fromDto(animeDto))),
			);
	}
}
