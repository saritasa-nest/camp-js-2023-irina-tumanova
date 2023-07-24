import { PaginationParamsDto } from '../dtos/pagination-params.dto';
import { PaginationParams } from '../models/pagination-params';

export namespace PaginationParamsMapper {

	/**
	 * Maps model to DTO.
	 * @param model Pagination params.
	 */
	export function toDto(model: PaginationParams): PaginationParamsDto {
		return {
			limit: model.pageSize,
			offset: model.pageSize * model.pageNumber,
		};
	}
}
