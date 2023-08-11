import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Studio } from '@js-camp/core/models/anime/studio';
import { StudioDto } from '@js-camp/core/dtos/anime/studio.dto';
import { StudioMapper } from '@js-camp/core/mappers/anime/studio.mapper';
import { ListParamsMapper } from '@js-camp/core/mappers/list-params.mapper';
import { DefaultListParams } from '@js-camp/core/models/list-params';

import { ApiUrlsConfig } from './api-urls.config';

/** Studio service. */
@Injectable({
	providedIn: 'root',
})
export class StudioService {

	private readonly http = inject(HttpClient);

	private readonly apiUrlsConfig = inject(ApiUrlsConfig);

	/**
	 * Get studios.
	 * @param studioParams Params from studios.
	 */
	public getStudios(studioParams: DefaultListParams<undefined>): Observable<Pagination<Studio>> {
		const url = this.apiUrlsConfig.studio.getList;
		const params = new HttpParams({
			fromObject: ListParamsMapper.toDto(
				studioParams,
				filters => filters,
				() => undefined,
			),
		});

		return this.http
			.get<PaginationDto<StudioDto>>(url, { params })
			.pipe(map(pagination => PaginationMapper.fromDto(pagination, StudioMapper.fromDto)));
	}

	/**
	 * Create studio.
	 * @param studioName Studio's name.
	 */
	public createStudio(studioName: string): Observable<Studio> {
		const url = this.apiUrlsConfig.studio.create;

		return this.http
			.post<StudioDto>(url, { name: studioName })
			.pipe(map(studioDto => StudioMapper.fromDto(studioDto)));
	}
}
