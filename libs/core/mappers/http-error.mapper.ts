import { HttpErrorDto } from '../dtos/http-error.dto';
import { HttpError } from '../models/http-error';

export namespace HttpErrorMapper {

	/**
	 * Maps DTO to model.
	 * @param dto Date range DTO.
	 */
	export function fromDto(dto: HttpErrorDto): HttpError[] {
		return dto.errors.map(errorDto => new HttpError({
			attr: errorDto.attr,
			code: errorDto.code,
			detail: errorDto.detail,
		}));
	}
}
