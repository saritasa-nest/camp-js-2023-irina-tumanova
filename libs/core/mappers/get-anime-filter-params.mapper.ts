import { GetAnimeFilterParamsDto } from '../dtos/get-anime-filter-params.dto';
import { GetAnimeFilterParams } from '../models/get-anime-params';

export namespace GetAnimeFilterParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model Anime query params model.
	 */
	export function toDto(model: GetAnimeFilterParams): GetAnimeFilterParamsDto {
		return {
			type: model.type,
			search: model.search,
		};
	}
}
