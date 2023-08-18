import { Genre } from '@js-camp/core/models/anime/genre';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { GenreDto } from '@js-camp/core/dtos/anime/genre.dto';
import { GenreMapper } from '@js-camp/core/mappers/anime/genre.mapper';

import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { PaginationParamsMapper } from '@js-camp/core/mappers/pagination-params.mapper';

import { http } from '..';

const url = 'anime/genres/';

export namespace GenresService {
	/**
	 * Fetches a list of genres.
	 * @param params Pagination params.
	 */
	export async function fetchGenres(params: PaginationParams): Promise<Genre[]> {
		const { data } = await http.get<PaginationDto<GenreDto>>(url, { params: PaginationParamsMapper.toDto(params) });
		return data.results.map((dto) => GenreMapper.fromDto(dto));
	}
}
