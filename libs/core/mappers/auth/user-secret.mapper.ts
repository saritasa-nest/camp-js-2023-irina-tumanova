import { UserSecretDto } from '../../dtos/auth/user-secret.dto';
import { UserSecret } from '../../models/auth/user-secret';

export namespace UserSecretMapper {

	/**
	 * Maps model to DTO.
	 * @param model User secret.
	 */
	export function toDto(model: UserSecret): UserSecretDto {
		return {
			refresh: model.refresh,
			access: model.access,
		};
	}

	/**
	 * Maps DTO to model.
	 * @param dto User secret DTO.
	 */
	export function fromDto(dto: UserSecretDto): UserSecret {
		return {
			refresh: dto.refresh,
			access: dto.access,
		};
	}
}
