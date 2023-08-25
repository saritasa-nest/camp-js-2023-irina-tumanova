import { StudioDto } from '../../dtos/studio/studio.dto';
import { Studio } from '../../models/studio/studio';

export namespace StudioMapper {

	/**
	 * Maps DTO to model.
	 * @param dto Studio DTO.
	 */
	export function fromDto(dto: StudioDto): Studio {
		return new Studio({
			id: dto.id,
			name: dto.name,
			created: new Date(dto.created),
			modified: new Date(dto.modified),
			thumbnailImg: dto.image,
		});
	}
}
