import { Register } from '../../models/auth/register';
import { RegisterDto } from '../../dtos/auth/register.dto';

export namespace RegisterMapper {

	/**
	 * Maps model to DTO.
	 * @param model Register.
	 */
	export function toDto(model: Register): RegisterDto {
		return {
			email: model.email,
			password: model.password,
			first_name: model.firstName,
			last_name: model.lastName,
			avatar: model.avatarUrl,
		};
	}
}
