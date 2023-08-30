import { Studio } from '@js-camp/core/models/studio/studio';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { StudioDto } from '@js-camp/core/dtos/studio/studio.dto';
import { StudioMapper } from '@js-camp/core/mappers/studio/studio.mapper';
import { StudioParams } from '@js-camp/core/models/studio/studio-params';
import { ListParamsMapper } from '@js-camp/core/mappers/list-params.mapper';
import { StudioFilterParamsMapper } from '@js-camp/core/mappers/studio/studio-filter-params.mapper';

import { http } from '..';
import { ApiUrlsConfig } from '../apiUrlsConfig';

export namespace StudiosService {

	/**
	 * Fetches a list of studios.
	 * @param params Studio params.
	 */
	export async function fetchStudios(params: StudioParams): Promise<Studio[]> {
		const { data } = await http.get<PaginationDto<StudioDto>>(ApiUrlsConfig.studio.getList, {
			params: ListParamsMapper.toDto(
				params,
				StudioFilterParamsMapper.toDto,
				field => StudioFilterParamsMapper.STUDIO_SORT_FIELD_TO_DTO[field],
			),
		});
		return data.results.map(dto => StudioMapper.fromDto(dto));
	}

	/**
	 * Fetches studio details.
	 * @param id Studio ID.
	 */
	export async function fetchStudioDetails(id: number): Promise<Studio> {
		const { data } = await http.get<StudioDto>(ApiUrlsConfig.studio.getDetail(id));
		return StudioMapper.fromDto(data);
	}
}
