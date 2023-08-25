import { StudioFilterParamsDto, StudioSortingFieldDto } from '../../../core/dtos/studio/studio-filter.dto';
import { StudioFilterParams } from '../../../core/models/studio/studio-params';
import { StudioSortingField } from '../../../core/models/studio/studio-sort';

export namespace StudioParamsMapper {

	/**
	 * Maps model to DTO.
	 * @param model Studio query params model.
	 */
	export function toDto(model: StudioFilterParams): StudioFilterParamsDto {
		return {
			search: model.search,
		};
	}

	export const STUDIO_SORT_FIELD_TO_DTO = {
		[StudioSortingField.Modified]: StudioSortingFieldDto.Modified,
		[StudioSortingField.Name]: StudioSortingFieldDto.Name,
	};
}
