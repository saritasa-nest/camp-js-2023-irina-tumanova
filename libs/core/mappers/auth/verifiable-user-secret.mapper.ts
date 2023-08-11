import { VerifiableUserSecretDto } from '../../dtos/auth/verifiable-user-secret.dto';

import { UserSecret } from '../../models/auth/user-secret';

export namespace VerifiableUserSecretMapper {

	/**
	 * Maps model to DTO.
	 * @param model User secret.
	 */
	export function toDto(model: UserSecret): VerifiableUserSecretDto {
		return { token: model.access };
	}
}
