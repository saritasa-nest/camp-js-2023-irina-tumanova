import { AppValidationError } from '../models/app-error';
import { HttpErrorItemDto } from '../dtos/http-error.dto';

export namespace AppErrorDictionaryMapper {

	/**
	 * Maps DTO to model.
	 * @param errorsDto Http errors DTO.
	 * @param mapper Validation errors mapper.
	 */
	export function fromDto<TErrors extends object>(errorsDto: HttpErrorItemDto[],
		mapper: (errors: readonly HttpErrorItemDto[]) => TErrors): AppValidationError<TErrors> | null {

		return new AppValidationError({ errors: mapper(errorsDto) });
	}
}
