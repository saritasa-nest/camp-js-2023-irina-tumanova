import { StudioFilterParamsDto, StudioSortingFieldDto } from '../../dtos/studio/studio-filter.dto';
import { StudioFilterParams } from '../../models/studio/studio-params';
import { StudioSortingField } from '../../models/studio/studio-sort';

export namespace StudioFilterParamsMapper {

	/**
	 * Maps model to DTO.
	 * @param model Studio query params model.
	 */
	export function toDto(model: StudioFilterParams): StudioFilterParamsDto {
		return {
			search: model.search,
		};
	}

	/** Converts model enum value to dto value. */
	export const STUDIO_SORT_FIELD_TO_DTO: Record<StudioSortingField, StudioSortingFieldDto> = {
		[StudioSortingField.Modified]: StudioSortingFieldDto.Modified,
		[StudioSortingField.Name]: StudioSortingFieldDto.Name,
	};
}
