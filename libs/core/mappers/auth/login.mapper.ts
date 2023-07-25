import { Login } from '../../models/auth/login';
import { LoginDto } from '../../dtos/auth/login.dto';

export namespace LoginMapper {

	/**
	 * Maps model to DTO.
	 * @param model Login.
	 */
	export function toDto(model: Login): LoginDto {
		return {
			email: model.email ?? '',
			password: model.password ?? '',
		};
	}
}
