import { APP_COMMON_ERRORS_KEY, AppError } from '../models/app-error';
import { HttpErrorDto } from '../dtos/http-error.dto';

export namespace AppErrorsMapper {

	/**
	 * Maps DTO to model.
	 * @param errorDto Http error DTO.
	 */
	export function fromDto(errorDto: HttpErrorDto): AppError<Error> {
		const appError: AppError<Error> = new AppError({ message: errorDto.message, name: errorDto.name });

		if (errorDto.error?.errors !== undefined) {
			errorDto.error.errors.forEach(httpError => {
				const appErrorItem: Error = { name: httpError.code, message: httpError.detail };
				const appErrorKey = httpError.attr === null ? APP_COMMON_ERRORS_KEY : httpError.attr;

				appError.errors[appErrorKey] = [...appError.errors[APP_COMMON_ERRORS_KEY], appErrorItem];
			});
		}

		return appError;
	}
}
