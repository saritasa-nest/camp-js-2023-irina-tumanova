import { HttpErrorItemDto } from '../../dtos/http-error.dto';
import { Registration, RegistrationValidationErrors } from '../../models/auth/registration';
import { RegistrationDto } from '../../dtos/auth/registration.dto';
import { extractErrorMessageFromArray } from '../extract-error-message';

export namespace RegistrationMapper {

	/**
	 * Maps model to DTO.
	 * @param model Register.
	 */
	export function toDto(model: Registration): RegistrationDto {
		return {
			email: model.email,
			password: model.password,
			first_name: model.firstName,
			last_name: model.lastName,
		};
	}

	/**
	 * Validate login error from dto.
	 * @param errors Http errors.
	 */
	export function validateErrorFromDto(errors: readonly HttpErrorItemDto[]): RegistrationValidationErrors {
		return {
			email: extractErrorMessageFromArray('email', errors),
			firstName: extractErrorMessageFromArray('first_name', errors),
			lastName: extractErrorMessageFromArray('last_name', errors),
			password: extractErrorMessageFromArray('password', errors),
			common: extractErrorMessageFromArray(null, errors),
		};
	}
}
