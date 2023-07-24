import { GenreDto } from '../../dtos/anime/genre.dto';
import { Genre } from '../../models/anime/genre';

export namespace GenreMapper {

	/**
	 * Maps DTO to model.
	 * @param dto Genre DTO.
	 */
	export function fromDto(dto: GenreDto): Genre {
		return new Genre({
			id: dto.id,
			name: dto.name,
		});
	}
}
