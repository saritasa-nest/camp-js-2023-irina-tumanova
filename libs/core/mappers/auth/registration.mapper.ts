import { Registration } from '../../models/auth/registration';
import { RegistrationDto } from '../../dtos/auth/registration.dto';

export namespace RegistrationMapper {

	/**
	 * Maps model to DTO.
	 * @param model Register.
	 */
	export function toDto(model: Registration): RegistrationDto {
		return {
			email: model.email ?? '',
			password: model.password ?? '',
			first_name: model.firstName ?? '',
			last_name: model.lastName ?? '',
		} as RegistrationDto;
	}
}
