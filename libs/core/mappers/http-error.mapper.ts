import { HttpErrorDto } from '../dtos/http-error.dto';
import { HttpError } from '../models/http-error';

export namespace HttpErrorMapper {

	/**
	 * Maps DTO to model.
	 * @param dto Http error DTO.
	 */
	export function fromDto(dto: HttpErrorDto): HttpError {
		return new HttpError({
			attr: dto.attr,
			code: dto.code,
			detail: dto.detail,
		});
	}
}
