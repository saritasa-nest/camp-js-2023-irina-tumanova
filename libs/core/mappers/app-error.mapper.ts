import { AppValidationError } from '../models/app-error';
import { HttpErrorDto, HttpErrorItemDto } from '../dtos/http-error.dto';

export namespace AppErrorDictionaryMapper {

	/**
	 * Maps DTO to model.
	 * @param errorDto Http error DTO.
	 * @param mapper Validation errors mapper.
	 */
	export function fromDto<TErrors extends object>(errorDto: HttpErrorDto,
		mapper: (errors: readonly HttpErrorItemDto[]) => TErrors): AppValidationError<TErrors> | null {

		if (errorDto.error?.errors !== undefined) {
			return new AppValidationError({ errors: mapper(errorDto.error.errors) });
		}
		return null;
	}
}
