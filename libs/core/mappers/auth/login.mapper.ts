import { HttpErrorItemDto } from '../../dtos/http-error.dto';
import { Login, LoginValidationErrors } from '../../models/auth/login';
import { LoginDto } from '../../dtos/auth/login.dto';
import { extractErrorMessageFromArray } from '../extract-error-message';

export namespace LoginMapper {

	/**
	 * Maps model to DTO.
	 * @param model Login.
	 */
	export function toDto(model: Login): LoginDto {
		return {
			email: model.email,
			password: model.password,
		};
	}

	/**
	 * Validate login error from dto.
	 * @param errors Http errors.
	 */
	export function validateErrorFromDto(errors: readonly HttpErrorItemDto[]): LoginValidationErrors {
		return {
			email: extractErrorMessageFromArray('email', errors),
			password: extractErrorMessageFromArray('password', errors),
			common: extractErrorMessageFromArray(null, errors),
		};
	}
}
