import { APP_COMMON_ERRORS_KEY, AppErrorDictionary } from '../models/app-error-dictionary';
import { HttpErrorDto } from '../dtos/http-error.dto';

export namespace AppErrorDictionaryMapper {

	/**
	 * Maps DTO to model.
	 * @param errorDto Http error DTO.
	 */
	export function fromDto(errorDto: HttpErrorDto): AppErrorDictionary {
		const appErrorDictionary = new AppErrorDictionary();

		if (errorDto.error?.errors !== undefined) {
			errorDto.error.errors.forEach(httpError => {
				const appErrorKey = httpError.attr === null ? APP_COMMON_ERRORS_KEY : httpError.attr;
				appErrorDictionary.errors[appErrorKey] = [...appErrorDictionary.errors[APP_COMMON_ERRORS_KEY], httpError.detail];
			});
		}

		return appErrorDictionary;
	}
}
