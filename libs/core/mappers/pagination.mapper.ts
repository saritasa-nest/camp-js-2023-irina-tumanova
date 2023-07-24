import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

	/**
	 * Maps DTO to model.
	 * @param dto Pagination DTO.
	 * @param mapper Pagination data DTO to model.
	 */
	export function fromDto<TDto, TModel>(dto: PaginationDto<TDto>, mapper: (dto: TDto) => TModel): Pagination<TModel> {
		return new Pagination({
			count: dto.count,
			next: dto.next,
			previous: dto.previous,
			items: dto.results.map(mapper),
		});
	}
}
