import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

	/**
	 * Maps dto to model.
	 * @param dto Pagination dto.
	 * @param mapper Pagination data dto to model.
	 */
	export function fromDto<TDto, TModel>(dto: PaginationDto<TDto>, mapper: (dto: TDto) => TModel): Pagination<TModel> {
		return {
			count: dto.count,
			next: dto.next,
			previous: dto.previous,
			results: dto.results.map(mapper),
		};
	}
}
