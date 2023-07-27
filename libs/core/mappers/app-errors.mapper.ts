import { HttpErrorDto } from '../dtos/http-error.dto';
import { APP_COMMON_ERRORS_KEY, AppError, AppErrors } from '../models/app-error';

export namespace AppErrorsMapper {

	/**
	 * Maps DTO to model.
	 * @param dto Http error DTO.
	 */
	export function fromDto(dto: HttpErrorDto[]): AppErrors {
		const appErrors: AppErrors = { common: [] };

		dto.forEach(httpError => {
			const appError = new AppError({ code: httpError.code, detail: httpError.detail });
			const appErrorKey = httpError.attr === null ? APP_COMMON_ERRORS_KEY : httpError.attr;

			appErrors[appErrorKey] = [...appErrors[APP_COMMON_ERRORS_KEY], appError];
		});

		return appErrors;
	}
}
