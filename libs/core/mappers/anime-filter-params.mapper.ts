import { AnimeFilterParamsDto } from '../dtos/anime-filter-params.dto';
import { AnimeFilterParams } from '../models/anime-params';

export namespace AnimeFilterParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model Anime query params model.
	 */
	export function toDto(model: AnimeFilterParams): AnimeFilterParamsDto {
		return {
			type: model.type,
			search: model.search,
		};
	}
}
